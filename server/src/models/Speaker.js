const mongoose = require("mongoose");
const validator = require("validator");

const Speaker = mongoose.model("Speaker", {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = Speaker;
