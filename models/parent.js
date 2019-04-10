const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ParentSchema = new Schema({
  studioId: String,
  pFirstName: String,
  pLastName: String,
  email: String,
  parentCellphone: String,
  messages: [
    {
      type: String,
      ref: "Message"
    }
  ],
  notes: [
    {
      body: String,
      date: Date
    }
  ],
  calls: [
    {
      date: Date,
      callType: String
    }
  ],
  children: [
    {
      type: String,
      ref: "Lead"
    }
  ]
});

const Parent = mongoose.model("Parent", ParentSchema);
module.exports = Parent;
