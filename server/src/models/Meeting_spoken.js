const mongoose = require("mongoose");
const validator = require("validator");
const Team = require("./Team");

const Person = mongoose.model("Person", {
  description: { type: String, trim: true },
  s_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Speaker",
  },
  p_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

module.exports = Person;
