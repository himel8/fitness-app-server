const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const serviceSchema = require("../schemas/serviceSchema");
const Service = new mongoose.model("Service", serviceSchema);

// get all services
router.get("/", async (req, res) => {
  await Service.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

// get a service by id
router.get("/:id", async (req, res) => {
  await Service.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

// post a service
router.post("/", async (req, res) => {
  const newService = new Service(req.body);
  await newService.save((err) => {
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

// update a service by id
router.put("/:id", async (req, res) => {
  await Service.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          message: "service updated successfully",
        });
      }
    }
  );
});

// Delete a service by id
router.delete("/:id", async (req, res) => {
  await Service.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "services deleted successfully",
      });
    }
  });
});

module.exports = router;
