const router = require("express").Router();
const mongoose = require("mongoose");
const OrderSchema = require("../schemas/orderSchema");
const Order = new mongoose.model("Order", OrderSchema);

// get all orders
router.get("/", async (req, res) => {
  await Order.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        Orders: data,
      });
    }
  });
});

// get an order by id
router.get("/:email", async (req, res) => {
  await Order.find({ email: req.params.email }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        Order: data,
      });
    }
  });
});

// post an order
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "order added successfully",
      });
    }
  });
});

// update an order by id
router.put("/:id", async (req, res) => {
  await Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        action: "paid",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          message: "order updated successfully",
        });
      }
    }
  );
});

// Delete an order by id
router.delete("/:id", async (req, res) => {
  await Order.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "order deleted successfully",
      });
    }
  });
});

module.exports = router;
