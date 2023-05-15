"use strict";

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// loading env variables
dotenv.config();

require("./db");

const app = express();

// using cors for cross origin requests
app.use(require("cors")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loading routes
app.use("/v1", require("./routes"));

// 404 route not found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  }
});

var server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
