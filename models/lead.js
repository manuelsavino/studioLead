const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const moment = require('moment');

const Twilio = require('twilio');



const LeadSchema = new Schema({
    pFirstName: String,
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
    triedClass: { type: Boolean, default: false },
    trialDate: String,
    signedUp: { type: Boolean, default: false }
})


LeadSchema.statics.sendNotification = () => {
    const tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
    Lead.find({ trialDate: tomorrow }).populate('classTrying', { 'nameOfClass': 1, 'time': 1 }).exec((err, result) => {
        // res.json(result)
        // console.log(result)
        if (result.length > 0) {
            sendNotification(result)

        }
    })

    function sendNotification(result) {
        const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        result.forEach(function (lead) {
            const options = {
                to: `+1${lead.parentCellphone}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                body: `Hello ${lead.pFirstName}, Just a reminder your trial ${lead.classTrying.nameOfClass} class for ${lead.cFirstName} is tomorrow at ${moment(lead.classTrying.time, "HH:mm").format("h:mm A")}.`
            }

            client.messages.create(options, function (err, response) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`messaged sent to ${lead.parentCellphone}`)
                }
            })
        })
    }


}

const Lead = mongoose.model("Lead", LeadSchema)
module.exports = Lead;
