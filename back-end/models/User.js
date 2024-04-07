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
      amount: { type: Number, required: true },
      currency: {
        type: String,
        enum: ["USD", "GBP", "EUR", "INR"],
        required: true,
      },
      date: { type: Date, required: true, default: Date.now() },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
