const router = require('express').Router(),
    classRoutes = require('./classes'),
    leadRoutes = require('./leads'),
    messages = require('./messages'),
    parents = require('./parents')


router.use('/classes', classRoutes)
router.use('/leads', leadRoutes)
router.use('/sms', messages)
router.use('/parents', parents)




module.exports = router;