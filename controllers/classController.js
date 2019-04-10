const db = require("../models");
const getStudioFromJwt = require("../helpers/decodeJwt");

module.exports = {
  getAll(req, res) {
    const { authorization } = req.headers;
    const studioId = getStudioFromJwt.getStudioFromJwt(authorization);
    db.Class.find({ studioId }).then(Class => {
      res.json(Class);
    });
  },

  //used for parent side to see classes
  getActiveClasses(req, res) {
    const { id } = req.params;
    console.log(id);
    db.Class.find({ status: true, studioId: id }).then(Class => {
      res.json(Class);
    });
  },

  createClass(req, res) {
    const { authorization } = req.headers;
    const studioId = getStudioFromJwt.getStudioFromJwt(authorization);
    const { nameOfClass, min, max, time, schedule } = req.body;
    const Class = { nameOfClass, min, max, time, schedule, studioId };
    db.Class.create(Class, (err, Class) => {
      if (err) {
        console.log(err);
      }
      res.json(Class);
    });
  },
  updateStatus(req, res) {
    let { id } = req.params;
    db.Class.findByIdAndUpdate(id, { $set: req.body }, (err, Class) => {
      res.status(200).json({ Class: Class });
    });
  }
};
