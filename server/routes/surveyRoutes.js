const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Surveys = mongoose.model('surveys');  

// Can keep including arguments to post() for as long as you like before calling the req/res function.
// Need to check if logged in and also if they have enough credits.
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: rew.user.id,
            dateSent: Date.now()

        })
    })
}