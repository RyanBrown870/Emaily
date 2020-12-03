const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');  

// Can keep including arguments to post() for as long as you like before calling the req/res function.
// Need to check if logged in and also if they have enough credits.
module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    })


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
        await mailer.send();
        await survey.save();                    // save the survey
        req.user.credits -= 1;                  // subtract a credit from the user
        const user = await req.user.save();     // save the user record

        res.send(user);
        } catch (err) {
            res.status(422).send(err);                    // unprocessable entry (some user error)
        }                                                 // send the error
        
    });
};