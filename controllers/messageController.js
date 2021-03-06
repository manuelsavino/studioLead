const db = require("../models");
const Twilio = require("twilio");

module.exports = {
  sendSms(req, res) {
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const from = process.env.TWILIO_PHONE_NUMBER;
    const { to, body, id } = req.body;
    const options = {
      to,
      from,
      body
    };
    client.messages.create(options, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        if (response) {
          db.Message.create({ from, to, body }).then(results => {
            db.Parent.findOneAndUpdate(
              { _id: id },
              { $push: { messages: results._id } }
            ).then(results => {
              res.status(200).json({ message: "message sent" });
            });
          });
        }
      }
    });
  },

  smsIn(req, res) {
    let { From, Body } = req.body;
    if (Body.toUpperCase() === "CONFIRM") {
      db.Message.create({ from: From, to: "7867893310", body: Body }).then(
        results => {
          db.Parent.findOneAndUpdate(
            { parentCellphone: From },
            { $push: { messages: results._id } }
          ).then(result => {
            db.Lead.update(
              { parent: result._id, sms: true },
              { $set: { confirmed: true } },
              { multi: true },
              (err, resp) => {
                if (err) {
                  console.log("err", err);
                }
                res.send(`<Response></Response>`);
              }
            );
          });
        }
      );
    } else {
      db.Message.create({ from: From, to: "7867893310", body: Body }).then(
        results => {
          db.Parent.findOneAndUpdate(
            { parentCellphone: From },
            { $push: { messages: results._id } }
          ).then(results => {
            console.log("else ran");
            res.send(`<Response></Response>`);
          });
        }
      );
    }
  }
};
