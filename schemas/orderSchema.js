const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    action: {
      type: String,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

module.exports = OrderSchema;
