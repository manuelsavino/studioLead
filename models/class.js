const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const classSchema = new Schema({
    nameOfClass: String,
    numberOfOpenings: Number,
    ageGroup: String,
    schedule: [
        { type: String }
    ],
    time: String

})

const Class = mongoose.model("Class", classSchema)
module.exports = Class;