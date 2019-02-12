const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("passport");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      userName: req.user.userName
    });
  }
);

module.exports = router;
