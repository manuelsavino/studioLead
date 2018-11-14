const router = require('express').Router(),
    classRoutes = require('./classes');

router.use('/classes', classRoutes)


module.exports = router;