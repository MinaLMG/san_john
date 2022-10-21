const mongoose = require("mongoose");
const validator = require("validator");

let schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date_created: {
    type: Date,
    required: true,
    trim: true,
  },
  meeting_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting_Type",
    required: true,
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Speaker",
    required: false,
  },
});
schema = schema.index({ meeting_type: 1, date: 1 }, { unique: true });
const Meeting = mongoose.model("Meeting", schema);
module.exports = Meeting;
