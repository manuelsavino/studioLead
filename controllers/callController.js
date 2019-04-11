const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const db = require("../model");

let client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  outBoundCall(req, res) {
    var { leadParent } = req.body;
    var url = `http://${req.headers.host}/api/calls/outbound/${leadParent}`;

    var options = {
      to: "+13054914679",
      from: process.env.TWILIO_PHONE_NUMBER,
      url: url
    };

    let record = {
      date: Date.now(),
      callType: "Outgoing"
    };

    db.Parent.findOneAndUpdate(
      { parentCellphone: leadParent },
      { $push: { calls: record } },
      (err, resp) => {
        console.log(err);
        // res.status(200).json({ status: "Call Placed" });
      }
    );

    // Place an outbound call to the user, using the TwiML instructions
    // from the /outbound route
    client.calls
      .create(options)
      .then(message => {
        res.send({
          message: "Connecting your Call."
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  returnTwiml(req, res) {
    var leadParent = req.params.leadParent;
    var twimlResponse = new VoiceResponse();

    twimlResponse.say("Connecting your Call", { voice: "alice" });

    twimlResponse.dial(leadParent);

    res.send(twimlResponse.toString());
  },
  logCall(req, res) {
    var callArr = [];
    client.calls.each({ to: "+13054914679'" }, calls => {
      // console.log(calls);
      callArr.push(calls);
      console.log("inside ", callArr.length);
      let start = calls.startTime;
      let finish = calls.endTime;
    });

    callArr.forEach(call => {
      console.log(call);
    });
    console.log(callArr.length);

    res.status(200);
  }
};
