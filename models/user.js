const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  studioId: {
    type: String,
    ref: "Studio"
  },
  picture: String //s3 Bucket url
});

const User = mongoose.model("User", userSchema);
module.exports = User;
