const router = require('express').Router()
const classController = require('../../controllers/classController')


router.get("/getClassesByAge/:age", classController.getClassByAge)

router.post("/", classController.createClass)

router.get("/", classController.getAll)


module.exports = router;