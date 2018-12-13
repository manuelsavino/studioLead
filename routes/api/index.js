const router = require('express').Router(),
    classRoutes = require('./classes'),
    leadRoutes = require('./leads'),
    messages = require('./messages')


router.use('/classes', classRoutes)
router.use('/leads', leadRoutes)
router.use('/sms',messages)



module.exports = router;