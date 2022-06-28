const mongoose = require("mongoose");
const validator = require("validator");
const Team = require("./Team");

const Person = mongoose.model("Person", {
  ID: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length !== 14) {
        throw new Error("national id is invalid");
      }
    },
  },
  birth_date: {
    type: Date,
    // validate(value) {
    //   if (!value.length !== 14) {
    //     throw new Error("national id is invalid");
    //   }
    // },
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});

module.exports = Person;
