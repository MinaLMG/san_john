const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/san_john", {
  useNewUrlParser: true,
});

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
