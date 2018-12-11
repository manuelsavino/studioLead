const router = require('express').Router()
const leadController = require('../../controllers/leadController')


router.get('/', leadController.getAllLeads)

router.post("/createLead", leadController.createLead)

router.post('/sms', leadController.handleSmsIn)

module.exports = router;