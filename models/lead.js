const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const moment = require('moment');
const message = require('./messages')

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
    signedUp: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    messages: [{
        type: String,
        ref: 'Message'
    }]

})


LeadSchema.statics.sendNotification = () => {
    const tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
    Lead.find({ trialDate: tomorrow }).populate('classTrying', { 'nameOfClass': 1, 'time': 1 }).exec((err, leads) => {
        // res.json(result)
        // console.log(result)
        if (leads.length > 0) {
            sendNotification(leads)
        }
    })

    function sendNotification(leads) {
        const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        leads.forEach(function (lead) {

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
                    // console.log(`messaged sent to ${lead.parentCellphone}`)
                    if (response) {
                        console.log('id:', lead._id)

                        message.create({ from: options.from, to: lead.parentCellphone, body: options.body }).then
                            (results => {
                                Lead.findOneAndUpdate({ _id: lead._id }, { $set: { 'sms': true }, $push: { messages: results._id } }).then(results => { })
                            }
                            )

                    }
                }
            })
        })
    }


}

const Lead = mongoose.model("Lead", LeadSchema)
module.exports = Lead;
