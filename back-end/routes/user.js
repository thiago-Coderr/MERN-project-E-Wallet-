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

//set date and hour function
function setDateAndHour() {
  const currentDate = new Date();

  console.log(currentDate);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the current time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const date = `${day}-${month}-${year}`;
  const time = `${hours}:${minutes}`;

  return { date: date, time: time };
}

///////////////////////////////////////////////////////////////////////
///////   SEND MONEY //////////////////////////////////////////////////

// Send USD
router.post("/sendUsd", verifyToken, async (req, res) => {
  const senderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    const receiver = await userModel.findOne({ email });
    const sender = await userModel.findOne({ email: senderEmail });

    if (!receiver) {
      return res.json({
        status: false,
        message: "User doesn't exist",
      });
    }

    if (receiver.email === senderEmail) {
      return res.json({
        status: false,
        message: "Choose another receiver",
      });
    }

    const actualBalance = sender.accountBalances.USD - amount;
    if (actualBalance < 0) {
      return res.json({
        status: false,
        message: "Insufficient balance",
      });
    }

    const dateAndtime = setDateAndHour();
    const sentBalance = receiver.accountBalances.USD + amount;

    // Update sender's balance and transaction array
    sender.accountBalances.USD = actualBalance;
    sender.transactions.push({
      type: "withdrawal",
      status: "Sent",
      method: "PayMe",
      receiverEmail: receiver.email,
      receiverName: receiver.username,
      amount: amount,
      currency: "USD",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });

    let array = sender.recipients.filter(
      (recipient) => recipient.userEmail === receiver.email
    );

    if (array.length == 0) {
      sender.recipients.push({
        username: receiver.username,
        userEmail: receiver.email,
      });
    }

    await sender.save();

    // Update receiver's balance and transaction array
    receiver.accountBalances.USD = sentBalance;
    receiver.transactions.push({
      type: "deposit",
      status: "Received",
      method: "PayMe",
      senderEmail: sender.email,
      senderName: sender.username,
      amount: amount,
      currency: "USD",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await receiver.save();

    return res.json({
      status: true,
      message: "Sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

// Send GBP

router.post("/sendGbp", verifyToken, async (req, res) => {
  const senderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    const receiver = await userModel.findOne({ email });
    const sender = await userModel.findOne({ email: senderEmail });

    if (!receiver) {
      return res.json({
        status: false,
        message: "User doesn't exist",
      });
    }

    if (receiver.email === senderEmail) {
      return res.json({
        status: false,
        message: "Choose another receiver",
      });
    }

    const actualBalance = sender.accountBalances.GBP - amount;
    if (actualBalance < 0) {
      return res.json({
        status: false,
        message: "Insufficient balance",
      });
    }

    const dateAndtime = setDateAndHour();
    const sentBalance = receiver.accountBalances.GBP + amount;

    // Update sender's balance and transaction array
    sender.accountBalances.GBP = actualBalance;
    sender.transactions.push({
      type: "withdrawal",
      status: "Sent",
      method: "PayMe",
      receiverEmail: receiver.email,
      receiverName: receiver.username,
      amount: amount,
      currency: "GBP",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });

    let array = sender.recipients.filter(
      (recipient) => recipient.userEmail === receiver.email
    );

    if (array.length == 0) {
      sender.recipients.push({
        username: receiver.username,
        userEmail: receiver.email,
      });
    }

    await sender.save();

    // Update receiver's balance and transaction array
    receiver.accountBalances.GBP = sentBalance;
    receiver.transactions.push({
      type: "deposit",
      status: "Received",
      method: "PayMe",
      senderEmail: sender.email,
      senderName: sender.username,
      amount: amount,
      currency: "GBP",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await receiver.save();

    return res.json({
      status: true,
      message: "Sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

// Send EUR

router.post("/sendEur", verifyToken, async (req, res) => {
  const senderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    const receiver = await userModel.findOne({ email });
    const sender = await userModel.findOne({ email: senderEmail });

    if (!receiver) {
      return res.json({
        status: false,
        message: "User doesn't exist",
      });
    }

    if (receiver.email === senderEmail) {
      return res.json({
        status: false,
        message: "Choose another receiver",
      });
    }

    const actualBalance = sender.accountBalances.EUR - amount;
    if (actualBalance < 0) {
      return res.json({
        status: false,
        message: "Insufficient balance",
      });
    }

    const dateAndtime = setDateAndHour();
    const sentBalance = receiver.accountBalances.EUR + amount;

    // Update sender's balance and transaction array
    sender.accountBalances.EUR = actualBalance;
    sender.transactions.push({
      type: "withdrawal",
      status: "Sent",
      method: "PayMe",
      receiverEmail: receiver.email,
      receiverName: receiver.username,
      amount: amount,
      currency: "EUR",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });

    let array = sender.recipients.filter(
      (recipient) => recipient.userEmail === receiver.email
    );

    if (array.length == 0) {
      sender.recipients.push({
        username: receiver.username,
        userEmail: receiver.email,
      });
    }

    await sender.save();

    // Update receiver's balance and transaction array
    receiver.accountBalances.EUR = sentBalance;
    receiver.transactions.push({
      type: "deposit",
      status: "Received",
      method: "PayMe",
      senderEmail: sender.email,
      senderName: sender.username,
      amount: amount,
      currency: "EUR",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await receiver.save();

    return res.json({
      status: true,
      message: "Sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

// Send INR

router.post("/sendInr", verifyToken, async (req, res) => {
  const senderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    const receiver = await userModel.findOne({ email });
    const sender = await userModel.findOne({ email: senderEmail });

    if (!receiver) {
      return res.json({
        status: false,
        message: "User doesn't exist",
      });
    }

    if (receiver.email === senderEmail) {
      return res.json({
        status: false,
        message: "Choose another receiver",
      });
    }

    const actualBalance = sender.accountBalances.INR - amount;
    if (actualBalance < 0) {
      return res.json({
        status: false,
        message: "Insufficient balance",
      });
    }

    const dateAndtime = setDateAndHour();
    const sentBalance = receiver.accountBalances.INR + amount;

    // Update sender's balance and transaction array
    sender.accountBalances.INR = actualBalance;
    sender.transactions.push({
      type: "withdrawal",
      status: "Sent",
      method: "PayMe",
      receiverEmail: receiver.email,
      receiverName: receiver.username,
      amount: amount,
      currency: "INR",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });

    let array = sender.recipients.filter(
      (recipient) => recipient.userEmail === receiver.email
    );

    if (array.length == 0) {
      sender.recipients.push({
        username: receiver.username,
        userEmail: receiver.email,
      });
    }

    await sender.save();

    // Update receiver's balance and transaction array
    receiver.accountBalances.INR = sentBalance;
    receiver.transactions.push({
      type: "deposit",
      status: "Received",
      method: "PayMe",
      senderEmail: sender.email,
      senderEmail: sender.username,
      amount: amount,
      currency: "INR",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await receiver.save();

    return res.json({
      status: true,
      message: "Sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

///////////////////////////////////////////////////////////////////////////
////////////////// Add Money

///// Add USD
router.post("/addUsdPaypal", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Paypal email must be same",
      });
    }
    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.USD + amount;

    // Update added balance and transaction array
    adder.accountBalances.USD = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Paypal",
      adder: "Me",
      amount: amount,
      currency: "USD",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/addUsdApplePay", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Apple pay email must be same",
      });
    }

    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.USD + amount;

    // Update added balance and transaction array
    adder.accountBalances.USD = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Apple pay",
      adder: "Me",
      amount: amount,
      currency: "USD",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/addUsdAmazon", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Amazon email must be same",
      });
    }

    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.USD + amount;

    // Update added balance and transaction array
    adder.accountBalances.USD = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Amazon pay",
      adder: "Me",
      amount: amount,
      currency: "USD",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

////Add GBP

router.post("/addGbpPayoneer", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Payoneer email must be same",
      });
    }

    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.GBP + amount;

    // Update added balance and transaction array
    adder.accountBalances.GBP = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Payoneer",
      adder: "Me",
      amount: amount,
      currency: "GBP",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/addGbpRevolut", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Revolut email must be same",
      });
    }

    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.GBP + amount;

    // Update added balance and transaction array
    adder.accountBalances.GBP = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Revolut",
      adder: "Me",
      amount: amount,
      currency: "GBP",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/addGbpAmazon", verifyToken, async (req, res) => {
  const adderEmail = req.decoded.username;
  const { email, amount } = req.body;

  try {
    if (adderEmail != email) {
      return res.json({
        status: false,
        message: "Amazon email must be same",
      });
    }

    const dateAndtime = setDateAndHour();

    const adder = await userModel.findOne({ email });
    const addedAmount = adder.accountBalances.GBP + amount;

    // Update added balance and transaction array
    adder.accountBalances.GBP = addedAmount;
    adder.transactions.push({
      type: "deposit",
      method: "Amazon pay",
      adder: "Me",
      amount: amount,
      currency: "GBP",
      dateTime: { date: dateAndtime.date, timeZone: dateAndtime.time },
    });
    await adder.save();

    return res.json({
      status: true,
      message: "Added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
