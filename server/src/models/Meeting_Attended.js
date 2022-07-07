const mongoose = require("mongoose");
const validator = require("validator");

const Meeting_Attended = mongoose.model(
  "Meeting_Attended",
  new mongoose.Schema({
    p_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    m_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    time_attended: {
      type: Date,
      required: true,
    },
  }).index({ p_ID: 1, m_ID: 1 }, { unique: true })
);
module.exports = Meeting_Attended;
