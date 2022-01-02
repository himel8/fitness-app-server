const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/serviceRoute");
const reviewRoute = require("./routes/reviewRoute");

// express app initialization
const app = express();
app.use(express.json());
app.use(cors());

// declear port
const port = 5000;

// database connection with mongoose
mongoose
  .connect(
    "mongodb+srv://himel_mart:bhiaJJNyU5v6L8p1@cluster0.tmyoe.mongodb.net/fitnessAppDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

// application routes
app.use("/api/services", userRoute);
app.use("/api/reviews", reviewRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
