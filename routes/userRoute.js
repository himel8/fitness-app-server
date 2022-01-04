const router = require("express").Router();
const mongoose = require("mongoose");
const UserSchema = require("../schemas/userSchema");
const { verifyToken } = require("./verifyToken");
const User = new mongoose.model("User", UserSchema);

/*------------------------
    get all user
--------------------------*/
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

/*------------------------
    get admin user
--------------------------*/
router.get("/:email", async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});
/*------------------------
    register new user
--------------------------*/
router.post("/", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
    }).save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

/*
router.put("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  await User.updateOne(
    { email: req.body.email },
    {
      $set: newUser,
    },
    { upsert: true },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          message: "users were updated successfully",
        });
      }
    }
  );
});
 */

/*------------------------
    upadte an admin role
--------------------------*/
router.put("/admin", verifyToken, async (req, res) => {
  try {
    const requester = req.decodeUser;
    if (requester) {
      const requesterAccount = await User.find({ email: requester });
      console.log(requesterAccount[0].isAdmin);
      if (requesterAccount[0].isAdmin === true) {
        const updateUser = await User.updateOne(
          { email: req.body.email },
          {
            $set: {
              isAdmin: "true",
            },
          }
        );
        res.status(200).json(updateUser);
      } else {
        res.status(401).json({
          message: "you dont have access to make admin",
        });
      }
    }
  } catch (err) {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    }
  }
});

/*------------------------
    delete user
--------------------------*/
router.delete("/:email", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ email: req.params.email });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

module.exports = router;
