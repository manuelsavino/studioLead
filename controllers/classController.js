const db = require("../models");

module.exports = {
  getAll(req, res) {
    db.Class.find({}).then(Class => {
      res.json(Class);
    });
  },
  getActiveClasses(req, res) {
    db.Class.find({ status: true }).then(Class => {
      res.json(Class);
    });
  },

  createClass(req, res) {
    const { nameOfClass, min, max, time, schedule } = req.body;
    const Class = { nameOfClass, min, max, time, schedule };
    db.Class.create(Class, (err, Class) => {
      if (err) {
        console.log(err);
      }
      res.json(Class);
    });
  }
};
