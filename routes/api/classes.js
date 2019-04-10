const router = require("express").Router();
const classController = require("../../controllers/classController");

router.post("/", classController.createClass);

router.get("/", classController.getAll);

router.get("/active/:id", classController.getActiveClasses);

router.put("/updateStatus/:id", classController.updateStatus);

module.exports = router;
