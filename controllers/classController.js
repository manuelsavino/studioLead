const db = require('../models')

module.exports = {
    getAll(req, res) {
        db.Class.find({}).then(Class => {
            res.json(Class)
        })

    },
    getClassByAge(req, res) {
        const age = req.params.age;
        const ageQuery = "";

        if (age >= 3 && age <= 4) {
            ageQuery = "3-4"
        } else if (age >= 5 && age <= 6) {
            ageQuery = "5-6"
        } else if (age >= 7 && age <= 9) {
            ageQuery = "7-9"
        } else if (age >= 10 && age <= 12) {
            ageQuery = "10-12"
        } else if (age >= 13 && age <= 17) {
            ageQuery = "13-17"
        }
        db.Class.find({
            ageGroup: ageQuery,
            numberOfOpenings: { $gte: 1 }
        }).then(resp => { res.json(resp) })

    },

    createClass(req, res) {
        const { nameOfClass, numberOfOpenings, ageGroup, time, schedule } = req.body
        const Class = { nameOfClass, numberOfOpenings, ageGroup, time, schedule }
        db.Class.create(Class, (err, Class) => {
            res.json(Class)
        })


    }


}