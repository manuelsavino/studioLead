const router = require('express').Router()
const parentController = require('../../controllers/parentController')




router.get('/', parentController.getAllParents)
router.get('/:id', parentController.getOneParent)



module.exports = router;