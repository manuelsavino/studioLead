const db = require('../models')

module.exports = {
    getAll(req, res) {
        db.Class.find({}).then(Class => {
            res.json(Class)
        })
    },
    getClassByAge(req, res) {
        let age = req.params.age;
        db.Class.find({
            status: true,
            min: { $lte: age },
            max: { $gte: age }
        }).then(resp => { res.json(resp) })

    },

    createClass(req, res) {
        const { nameOfClass, min, max, time, schedule } = req.body
        const Class = { nameOfClass, min, max, time, schedule }
        db.Class.create(Class, (err, Class) => {
            if (err) {
                console.log(err)
            }
            res.json(Class)
        })
    }

}