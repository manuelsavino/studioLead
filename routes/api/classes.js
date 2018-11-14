const router = require('express').Router()
const classController = require('../../controllers/classController')


router.get("/getClassByAge", classController.getClassByAge)

router.post("/class", classController.createClass)

router.get("/", classController.getAll)


module.exports = router;