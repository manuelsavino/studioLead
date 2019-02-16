const router = require("express").Router();
const classController = require("../../controllers/classController");

router.post("/", classController.createClass);

router.get("/", classController.getAll);

router.get("/active", classController.getActiveClasses);

module.exports = router;
