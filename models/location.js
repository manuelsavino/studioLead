const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const locationSchema = new Schema({
    Name: String,
    Address: String,
    Address2: String,
    City: String,
    State: String,
    Zip: String,
    Website: String,
    Email: String,
    Manager: String,
    Phone: String
})

const Location = mongoose.model("Location", locationSchema)
module.exports = Location;