const db = require("../models");
const Twilio = require("twilio");

module.exports = {

    sendSms(req ,res)
    {

      const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const from = process.env.TWILIO_PHONE_NUMBER
      const { to, body, id} = req.body
      const options = {
          to,
          from,
          body
      }
      client.messages.create(options, function (err, response) {
          if (err) {
              console.log(err)
          }
          else {
              if (response) {
                  db.Message.create({ from, to, body }).then
                      (results => {
                          db.Lead.findOneAndUpdate({ _id: id }, { $push: { messages: results._id } }).then(results => { })
                      }
                      )
              }
          }
      })
    }

}
