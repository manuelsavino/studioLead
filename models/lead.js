const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Parent = require('./parent')
const moment = require('moment');
const message = require('./messages')
const Twilio = require('twilio');



const LeadSchema = new Schema({

    cFirstName: String,
    cLastName: String,
    parent: {
        type: String,
        ref: 'Parent'
    },
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
})


LeadSchema.statics.sendNotification = () => {
    const tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
    Lead.find({ trialDate: tomorrow }).populate('classTrying', { 'nameOfClass': 1, 'time': 1 }).populate("parent").exec((err, leads) => {
        // res.json(result)
        // console.log(result)
        console.log(leads)
        if (leads.length > 0) {
            sendNotification(leads)
        }
    })



    function sendNotification(leads) {
        const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        leads.forEach(function (lead) {
            console.log(lead)
            const options = {
                to: lead.parent.parentCellphone,
                from: process.env.TWILIO_PHONE_NUMBER,
                body: `Hello ${lead.parent.pFirstName}, Just a reminder your trial ${lead.classTrying.nameOfClass} class for ${lead.cFirstName} is tomorrow at ${moment(lead.classTrying.time, "HH:mm").format("h:mm A")}.`
            }

            client.messages.create(options, function (err, response) {
                if (err) {
                    console.log(err)
                }
                else {
                    if (response) {
                        console.log('id:', lead._id)

                        message.create({ from: options.from, to: lead.parentCellphone, body: options.body }).then
                            (results => {
                                Parent.findOneAndUpdate({ _id: lead.parent._id }, { $push: { messages: results._id } }).then(results => { })
                            }
                            )
                        //$set: { 'sms': true }, 

                    }
                }
            })
        })
    }


}

const Lead = mongoose.model("Lead", LeadSchema)
module.exports = Lead;
