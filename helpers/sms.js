const db = require("../models");
const moment = require("moment");
const Twilio = require("twilio");

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  sendSms(parent, lead) {
    console.log("parent", parent);
    console.log("lead", lead);
    const options = {
      to: parent.parentCellphone,
      from: process.env.TWILIO_PHONE_NUMBER,
      //   body: `Hello ${parent.pFirstName}, Thank you for signing up ${lead.cFirstName} for a FREE trial class. We will send you a text message the day before to remind you. Hope to see you soon!`
      body: `Hi ${
        parent.pFirstName
      }! You're receiving this message because you signed up ${
        lead.cFirstName
      } for a FREE trial class in our studio. Please click below for next steps https://www.dancedoral.com/next-steps/ 
      Ascendance Studio`
    };

    client.messages.create(options, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response) {
          db.Message.create({
            from: options.from,
            to: parent.parentCellphone,
            body: options.body
          }).then(results => {
            db.Parent.findOneAndUpdate(
              { _id: parent._id },
              { $push: { messages: results._id } }
            ).then(results => {
              return "Done";
            });
          });
        }
      }
    });
  }
};
