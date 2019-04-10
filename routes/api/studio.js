const router = require("express").Router();
const studioController = require("../../controllers/studioController");

router.post("/", studioController.createNewStudio);
router.get("/", studioController.findAll);

module.exports = router;
