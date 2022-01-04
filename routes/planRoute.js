const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const planSchema = require("../schemas/planSchema");
const Plan = new mongoose.model("Plan", planSchema);

router.get("/", async (req, res) => {
  await Plan.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/", async (req, res) => {
  const newplan = new Plan(req.body);
  await newplan.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "user added successfully",
      });
    }
  });
});

module.exports = router;
