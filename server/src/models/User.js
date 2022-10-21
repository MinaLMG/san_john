const mongoose = require("mongoose");
const validator = require("validator");

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});
schema = schema.index({ name: 1, password: 1 }, { unique: true });

const User = mongoose.model("User", schema);

module.exports = User;
