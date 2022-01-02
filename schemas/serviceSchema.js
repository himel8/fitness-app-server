const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imgUrl: String,
  price: Number,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = serviceSchema;
