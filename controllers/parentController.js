const db = require('../models')


module.exports = {

    getAllParents(req, res) {
        db.Parent.find({}, (err, resp) => {

            res.json(resp)
        })
    },

    getOneParent(req, res) {
        const { id: _id } = req.params;

        db.Parent.find({ _id }).populate('messages').populate({ path: 'children', populate: { path: "classTrying", model: 'Class' } }).exec((err, resp) => {
            if (err) {
                console.log(err)
            }
            console.log(resp)
            res.json(resp)

        })

    },


}