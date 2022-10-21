const mongoose = require("mongoose");
const validator = require("validator");

const Meeting = mongoose.model(
  "Meeting",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true,
      unique: true,
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
    },
  }).index({ meeting_type: 1, date: 1 }, { unique: true })
);
module.exports = Meeting;
