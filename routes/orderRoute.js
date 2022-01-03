const router = require("express").Router();
const mongoose = require("mongoose");
const OrderSchema = require("../schemas/orderSchema");
const Order = new mongoose.model("Order", OrderSchema);

// get all orders
router.get("/", async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

// get an order by id
router.get("/:email", async (req, res) => {
  try {
    const singelOrder = await Order.find({ email: req.params.email });
    res.status(200).json(singelOrder);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

// post an order
router.post("/", async (req, res) => {
  try {
    const newOrder = await new Order(req.body).save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

// update an order by id
router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          action: "paid",
        },
      }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

// Delete an order by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteOrder = await Order.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteOrder);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

module.exports = router;
