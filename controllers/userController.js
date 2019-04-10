const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//input Validation
const validateRegisterInput = require("../validation/register");

module.exports = {
  findAll(req, res) {
    db.User.find({}, (err, resp) => {
      res.json(resp);
    });
  },

  register(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      console.log("here");
      return res.status(400).json(errors);
    }

    db.User.findOne({ username: req.body.userName }).then(user => {
      if (user) {
        return res.status(400).json({ useruname: "Username already exists" });
      } else {
        let { firstName, lastName, userName, password, studioId } = req.body;
        let user = { firstName, lastName, userName, password, studioId };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            console.log(user.password);
            user.password = hash;
            db.User.create(user)
              .then(user => {
                res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  login(req, res) {
    const { userName, password } = req.body;

    db.User.findOne({ userName })
      .populate("studioId")
      .exec((err, user) => {
        if (!user) {
          return res.status(404).json({ username: "Username not found" });
        }
        console.log(user);
        //Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              studio: user.studioId.id,
              studioName: user.studioId.name
            };
            jwt.sign(
              payload,
              process.env.SECRETORKEY,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Password incorrect" });
          }
        });
      });
  }
};
