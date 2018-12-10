const router = require('express').Router()
const leadController = require('../../controllers/leadController')


router.get('/', leadController.getAllLeads)

router.post("/createLead", leadController.createLead)


module.exports = router;