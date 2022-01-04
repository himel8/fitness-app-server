const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: Array,
  img: String,
  price: Number,
  category: String,
});

module.exports = serviceSchema;
