const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const Twilio = require('twilio');

const MessageSchema = new Schema({
    from: String,
    to: String,
    body: String,
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message;
