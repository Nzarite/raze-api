"use strict";

const express = require("express");
const router = express.Router();
const { UserRoleController } = require("../controller");

router.get("/", UserRoleController.getUserRoles);
router.post("/", UserRoleController.addUserRole);
router.put("/:id", UserRoleController.editUserRole);
router.delete("/:id", UserRoleController.deleteUserRole);

module.exports = router;
