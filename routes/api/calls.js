const router = require("express").Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;

let client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/call", function(req, res) {
  console.log("post call hit");
  var leadParent = req.body.leadParent;
  var url = `http://${req.headers.host}/api/calls/outbound/${leadParent}`;

  var options = {
    to: "+17863573069",
    from: process.env.TWILIO_PHONE_NUMBER,
    url: url
  };

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

module.exports = router;
