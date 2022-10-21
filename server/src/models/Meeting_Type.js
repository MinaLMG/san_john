const mongoose = require("mongoose");
const validator = require("validator");

const Meeting_Type = mongoose.model("Meeting_Type", {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = Meeting_Type;
