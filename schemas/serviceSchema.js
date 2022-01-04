const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  img: String,
});

module.exports = serviceSchema;
