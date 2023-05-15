"use strict";

const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");

router.get("/", UserController.getAllUsers);
router.get("/permissions/:id", UserController.getUserPermissions);
router.get("/:id", UserController.getUserById);
router.get("/:email", UserController.getAllUsers);
router.post("/", UserController.addUser);
router.put("/:id", UserController.editUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
