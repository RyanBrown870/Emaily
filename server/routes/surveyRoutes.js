const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

// Can keep including arguments to post() for as long as you like before calling the req/res function.
// Need to check if logged in and also if they have enough credits.
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.delete("/api/delete-survey/:id", (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    Survey.findByIdAndDelete(id)
    // res.send("You deleted");
    .then((result) => {

    res.redirect("/api/surveys");
        
        })
        .catch(err => {
            console.log(err);
        })
  })

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice"); // create parser object. extract with colon the part of the path you want.

    // req.body has all the events so map over this using lodash library.
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        // if no surveyId or choice, then p.test will return null
        const match = p.test(new URL(url).pathname);
        // select truthy match as some will be null.
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() // remove undefined records using compact method.
      .uniqBy("email", "surveyId") // check whether there are repeated events from same email on the same surveyId and remove them.
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save(); // save the survey
      req.user.credits -= 1; // subtract a credit from the user
      const user = await req.user.save(); // save the user record

      res.send(user);
    } catch (err) {
      res.status(422).send(err); // unprocessable entry (some user error)
    } // send the error
  });
};
