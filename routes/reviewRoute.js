const router = require("express").Router();
const mongoose = require("mongoose");
const ReviewSchema = require("../schemas/reviewSchema");
const Review = new mongoose.model("Review", ReviewSchema);

router.get("/", async (req, res) => {
  try {
    const review = await Review.find({});
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json("there was a server side error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newReview = await new Review(req.body).save();
    res.status(200).json({
      message: "user added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

module.exports = router;
