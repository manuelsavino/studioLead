const router = require("express").Router();
const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const db = require("../../models/");
const callController = require("../../controllers/callController");

let client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/call", callController.outBoundCall);
// Return TwiML instuctions for the outbound call
router.post("/outbound/:leadParent", callController.returnTwiml);
router.get("/log", callController.logCall);
module.exports = router;
