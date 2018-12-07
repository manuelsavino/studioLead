const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const classSchema = new Schema({
    nameOfClass: String,
    status: { type: Boolean, default: true },
    min: Number,
    max: Number,
    schedule: [
        { type: Number }
    ],
    time: String,
    location: String

})

const Class = mongoose.model("Class", classSchema)
module.exports = Class;