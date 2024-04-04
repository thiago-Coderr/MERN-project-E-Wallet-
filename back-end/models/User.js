const mongoose = require("mongoose");

function roundToDecimal(value) {
  return Math.round(value * 100) / 100;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountBalances: {
    USD: {
      type: Number,
      default: 0,
      set: (value) => {
        return roundToDecimal(value);
      }, // Round to two decimal places on save
    },
    GBP: {
      type: Number,
      default: 0,
      set: (value) => {
        return roundToDecimal(value);
      },
    },
    EUR: {
      type: Number,
      default: 0,
      set: (value) => {
        return roundToDecimal(value);
      },
    },
    INR: {
      type: Number,
      default: 0,
      set: (value) => {
        return roundToDecimal(value);
      },
    },
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
