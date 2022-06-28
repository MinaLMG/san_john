const mongoose = require("mongoose");
const validator = require("validator");

const Father = mongoose.model("Father", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Father;
