const router = require("express").Router();
const messageController = require("../../controllers/messageController");

router.post("/out", messageController.sendSms);

router.post("/in", messageController.smsIn);

module.exports = router;
