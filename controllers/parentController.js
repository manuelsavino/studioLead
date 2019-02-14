const db = require("../models");

module.exports = {
  getAllParents(req, res) {
    db.Parent.find({}, (err, resp) => {
      res.json(resp);
    });
  },

  getOneParent(req, res) {
    const { id: _id } = req.params;

    db.Parent.find({ _id })
      .populate("messages")
      .populate({
        path: "children",
        populate: { path: "classTrying", model: "Class" }
      })
      .exec((err, resp) => {
        if (err) {
          console.log(err);
        }
        res.json(resp);
      });
  },

  writeNote(req, res) {
    const { body, id } = req.body;
    const date = Date.now();
    const note = {
      body,
      date
    };

    db.Parent.findByIdAndUpdate(id, { $push: { notes: note } }, (err, note) => {
      if (err) return staus(500).json({ error: err });
      res.status(200).json({ note: note });
    });
  }
};
