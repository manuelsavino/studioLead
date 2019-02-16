const router = require("express").Router();
const leadController = require("../../controllers/leadController");

router.get("/:id", leadController.getOneLeadById);

router.get("/", leadController.getAllLeads);

router.post("/createLead", leadController.createLead);

router.post("/sms", leadController.handleSmsIn);

router.put("/updateStatus/:id", leadController.updateStatus);

module.exports = router;
