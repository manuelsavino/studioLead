const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ParentSchema = new Schema({
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
  notes: [{ type: String }],
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
