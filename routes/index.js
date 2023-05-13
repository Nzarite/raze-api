"use strict";

const express = require("express");
const router = express.Router();

router.use("/user", require("./user.route"));
router.use("/userrole", require("./user.role.route"));

module.exports = router;
