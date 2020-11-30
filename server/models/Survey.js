const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema ({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // Sets up relationship between this survey model and a particular user
    dateSent: Date,
    lastResponded: Date                                 // cane be used for extra features.
});

mongoose.model('surveys', surveySchema);