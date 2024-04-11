const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountBalances: {
    USD: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value).toFixed(2),
      // Round to two decimal places on save
    },

    GBP: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value).toFixed(2),
    },

    EUR: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value).toFixed(2),
    },

    INR: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value).toFixed(2),
    },
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ["deposit", "withdrawal"],
        required: true,
      },

      status: { type: String, required: false },

      method: {
        type: String,
        enum: [
          "PayMe",
          "Paypal",
          "Amazon pay",
          "Apple pay",
          "Revolute",
          "Transfer Wise",
          "Google pay",
          "Payoneer",
          "Paytm",
          "Phonepe",
        ],
        required: true,
      },

      senderEmail: {
        type: String,
        required: false,
      },

      senderName: {
        type: String,
        required: false,
      },

      receiverEmail: {
        type: String,
        required: false,
      },

      receiverName: {
        type: String,
        required: false,
      },

      adder: {
        type: String,
        enum: ["Me"],
        required: false,
      },

      amount: { type: Number, required: true },

      currency: {
        type: String,
        enum: ["USD", "GBP", "EUR", "INR"],
        required: true,
      },

      dateTime: {
        date: {
          type: String,
          required: true,
        },

        timeZone: { type: String, required: true },
      },
    },
  ],
  recipients: [
    {
      username: { type: String, required: true },
      userEmail: { type: String, required: true },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
