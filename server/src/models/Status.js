const mongoose = require("mongoose");
const validator = require("validator");

const Status = mongoose.model("Status", {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = Status;
