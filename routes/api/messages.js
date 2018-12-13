const router = require("express").Router();
const messageController = require('../../controllers/messageController')

router.post('/out', messageController.sendSms)

module.exports = router;
