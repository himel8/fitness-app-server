const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/serviceRoute");
const reviewRoute = require("./routes/reviewRoute");
const orderRoute = require("./routes/orderRoute");
require("dotenv").config();

// express app initialization
const app = express();

app.use(cors());
app.use(express.json());

// declear port
const port = process.env.PORT || 5000;

// database connection with mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tmyoe.mongodb.net/fitnessAppDB?retryWrites=true&w=majority`
  )
  .then(() => console.log("database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

// application routes
app.use("/api/services", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
