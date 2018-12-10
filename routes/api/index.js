const router = require('express').Router(),
    classRoutes = require('./classes'),
    leadRoutes = require('./leads');


router.use('/classes', classRoutes)
router.use('/leads', leadRoutes)



module.exports = router;