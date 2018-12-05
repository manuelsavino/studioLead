const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const LeadSchema = new Schema({
    pFirstname: String,
    pLastName: String,
    email: String,
    parentCellphone: String,
    cFirstName: String,
    cLastName: String,
    age: Number,
    classTrying: {
        type: String,
        ref: "Class"
    },
    triedClass: Boolean,
    trialDate: Date,
    signedUp: Boolean
})

const Lead = mongoose.model("Lead", LeadSchema)
module.exports = Lead;