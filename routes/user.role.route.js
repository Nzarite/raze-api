"use strict";

const express = require("express");
const router = express.Router();
const { UserRoleController } = require("../controller");

router.get("/", UserRoleController.getUserRoles);
router.post("/add", UserRoleController.addUserRole);
router.put("/edit/:id", UserRoleController.editUserRole);
router.delete("/delete/:id", UserRoleController.deleteUserRole);

module.exports = router;
