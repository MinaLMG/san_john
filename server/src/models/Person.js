const mongoose = require("mongoose");
const validator = require("validator");
const Team = require("./Team");

const Person = mongoose.model("Person", {
  name: { type: String, required: true, trim: true, unique: true },
  ID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  education_year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Education_Year",
  },
  father: {
    type: String,
    trim: true,
  },
  bapitization_father: {
    type: String,
    trim: true,
  },
  bapitization_date: {
    type: Date,
  },
  bapitization_church: {
    type: String,
    trim: true,
  },

  address: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
  },

  facebook: {
    type: String,
    trim: true,
  },

  father_job: {
    type: String,
    trim: true,
  },

  father_phone_number: {
    type: String,
    trim: true,
  },
  mother_job: {
    type: String,
    trim: true,
  },

  mother_phone_number: {
    type: String,
    trim: true,
  },
  prep_date_entered: {
    type: Date,
  },
  prep_date_graduated: {
    type: Date,
  },

  serv_date_entered: {
    type: Date,
  },
  serv_date_graduated: {
    type: Date,
  },
});

module.exports = Person;
