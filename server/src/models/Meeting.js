const mongoose = require("mongoose");
const validator = require("validator");

const Meeting = mongoose.model("Meeting", {
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date_created: {
    type: Date,
    required: true,
    trim: true,
  },
});

module.exports = Meeting;
