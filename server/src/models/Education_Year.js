const mongoose = require("mongoose");
const validator = require("validator");

const Education_Yaer = mongoose.model("Education_Yaers", {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = Education_Yaer;
