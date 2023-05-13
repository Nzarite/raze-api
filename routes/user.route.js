"use strict";

const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");

router.get("/", UserController.getAllUsers);
router.get("/permissions", UserController.getUserPermissions);
router.get("/:id", UserController.getUserById);
router.get("/:email", UserController.getAllUsers);
router.post("/add", UserController.addUser);
router.put("/edit/:id", UserController.editUser);
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
