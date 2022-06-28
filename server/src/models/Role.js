const mongoose = require("mongoose");
const validator = require("validator");

const Role = mongoose.model("Role", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Role;
