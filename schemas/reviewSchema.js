const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = ReviewSchema;
