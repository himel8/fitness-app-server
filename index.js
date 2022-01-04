const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceRoute = require("./routes/serviceRoute");
const userRoute = require("./routes/userRoute");
const reviewRoute = require("./routes/reviewRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
require("dotenv").config();

// firebase JWT
const serviceAccount = require('./fitness-club-firebase-adminsdk.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
app.use("/api/services", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
