"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  role: { type: Schema.Types.ObjectId, ref: "UserRole" },
  permissions: [String],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
