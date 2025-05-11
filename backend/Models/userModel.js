const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  isVerified: { type: Boolean, default: false },

  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  otpExpires: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
