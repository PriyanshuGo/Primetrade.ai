import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// models/User.js

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bio: { type: String, default: "" },    // short about user
    address: { type: String, default: "" }, // optional
    refreshToken: { type: String, default: "" },
    refreshToken: {
      type: String,
      default: "",

    }
  },
  { timestamps: true }
);

userSchema.methods.generateAcessToken = function () {
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
  return refreshToken;
};

export const User = mongoose.model("User", userSchema);