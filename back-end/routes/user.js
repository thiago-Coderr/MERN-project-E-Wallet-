const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const router = express.Router();

//  Signup--Create a new user router
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    return res.json({ status: false, message: "Email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel({ username, email, password: hashPassword });
  await newUser.save();

  return res.json({ status: true, message: "record registed" });
});

// Login with user credentials
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({
      status: false,
      message: "*Wrong email or not registed*",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ status: false, message: "*Invalid Password!*" });
  }

  const token = jwt.sign({ username: user.email }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

  return res.json({
    status: true,
  });
});

module.exports = router;
