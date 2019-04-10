const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const studioSchema = new Schema({
  name: String,
  location: [
    {
      Address: String,
      Address2: String,
      City: String,
      State: String,
      Zip: String,
      Email: String,
      Manager: String,
      Phone: String
    }
  ],
  website: String
});

const Studio = mongoose.model("Studio", studioSchema);
module.exports = Studio;
