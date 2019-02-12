const router = require("express").Router(),
  classRoutes = require("./classes"),
  leadRoutes = require("./leads"),
  messages = require("./messages"),
  calls = require("./calls");
(parents = require("./parents")), (users = require("./users"));

router.use("/classes", classRoutes);
router.use("/leads", leadRoutes);
router.use("/sms", messages);
router.use("/parents", parents);
router.use("/users", users);
router.use("/calls", calls);

module.exports = router;
