const router = require("express").Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const moment = require("moment");
const db = require("../../models/");

let client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/call", function(req, res) {
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
});

// Return TwiML instuctions for the outbound call
router.post("/outbound/:leadParent", function(req, res) {
  var leadParent = req.params.leadParent;
  var twimlResponse = new VoiceResponse();

  twimlResponse.say("Connecting your Call", { voice: "alice" });

  twimlResponse.dial(leadParent);

  res.send(twimlResponse.toString());
});

router.get("/log", (req, res) => {
  var callArr = [];
  client.calls.each({ to: "+13054914679'" }, calls => {
    // console.log(calls);
    callArr.push(calls);
    console.log("inside ", callArr.length);
    let start = calls.startTime;
    let finish = calls.endTime;
    // console.log(start, finish);

    // let time = moment
    //   .utc(
    //     moment(finish, "DD/MM/YYYY HH:mm:ss").diff(
    //       moment(start, "DD/MM/YYYY HH:mm:ss")
    //     )
    //   )
    //   .format("HH:mm:ss");
    // console.log(start, finish);
    // console.log(calls.status);
    // console.log(time);
  });

  callArr.forEach(call => {
    console.log(call);
  });
  console.log(callArr.length);

  res.status(200);
});

module.exports = router;
