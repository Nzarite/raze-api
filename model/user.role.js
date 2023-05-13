"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  role: String,
  permissions: [String],
  priority: Number,
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
