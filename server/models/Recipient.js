const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    reponded: { type: Boolean, default: false }
});

// Dont need to send sub-document to Mongo, instead associate with Survey.js
module.exports = recipientSchema;