const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const Phone_Number = mongoose.model("Phone_Number", {
  number: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value[0] !== "0" || value[1] !== "1" || value.length !== 11) {
        throw new Error("phone number is invalid");
      }
    },
  },
  p_ID: { type: Schema.Types.ObjectId, required: true, ref: "Person" },
  //  ref: "person" },
});

module.exports = Phone_Number;
