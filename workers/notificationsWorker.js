'use strict';

const Lead = require('../models/lead');

const notificationWorkerFactory = function () {
    return {
        run: function () {
            Lead.sendNotification();
        },
    };
};

module.exports = notificationWorkerFactory();
