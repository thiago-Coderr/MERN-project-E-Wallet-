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

//forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "Email does not exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5min",
    });

    var transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "tiagoafonso110@gmail.com",
        pass: "ovyl ttki lidz hclo",
      },
    });

    var mailOptions = {
      from: "tiagoafonso110@gmail.com",
      to: email,
      subject: "Reset password",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(err);
  }
});

//Reset a new password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const newPassword = password;

  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(
      { _id: id },
      {
        password: hashPassword,
      }
    );

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
});

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers["x-access-token"] || req.query.token;

    if (!token) {
      return res.json({
        status: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.json({ error: error });
  }
};

//Dashboard authentication
router.get("/dash-board", verifyToken, async (req, res) => {
  const email = req.decoded.username;
  const user = await userModel.findOne({ email });
  res.json({
    status: true,
    message: "Welcome to the dashboard!",
    user,
  });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({
    status: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
