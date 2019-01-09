const db = require('../models')


module.exports = {

    getAllParents(req, res) {
        db.Parent.find({}, (err, resp) => {

            res.json(resp)
        })
    },

    getOneParent(req, res) {
        const { id: _id } = req.params;
        db.Parent.find({ _id }).populate('children').exec((err, resp) => {
            res.json(resp)
        })
    },


}