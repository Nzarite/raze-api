"use strict";

const mongoose = require("mongoose");
const mongooseOptions = {};
const mongodb_uri = process.env.MONGODB_URI;

require("../model/user");
require("../model/user.role");

mongoose
  .connect(mongodb_uri, mongooseOptions)
  .then(() => {
    console.log("Mongodb connected successfully.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongodb: ${err}`);
  });
