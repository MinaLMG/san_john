const mongoose = require("mongoose");
const validator = require("validator");

const Meeting_Attended = mongoose.model("Meeting_Attended", {
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
});

module.exports = Meeting_Attended;
