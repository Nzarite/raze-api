"use strict";

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const UserRole = mongoose.model("UserRole");
const UserRoleController = {};

UserRoleController.getUserRoles = async (req, res, next) => {
  try {
    const userRoles = await UserRole.find();
    return res.json(userRoles);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

UserRoleController.addUserRole = async (req, res, next) => {
  try {
    if (req.body.userRole) {
      const userRoleObj = new UserRole(req.body.userRole);
      await userRoleObj.save();
      res.status(201).json({ message: "user role saved!" });
    } else {
      res.status(403).json({ message: "User Role Payload is missing" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

UserRoleController.editUserRole = async (req, res, next) => {
  try {
    if (req.body.userRole) {
      const id = new ObjectId(req.params.id);
      const updatedUserRole = req.body.userRole;
      const updatedUserRoleObj = await UserRole.updateOne(
        { _id: id },
        { $set: updatedUserRole },
        { new: true },
      );
      if (updatedUserRoleObj.modifiedCount) {
        res.json({
          message: "user updated successfully",
        });
      } else {
        res.json({ message: "no modification made" });
      }
    } else {
      res.status(403).json({ message: "User Role Payload is missing" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

UserRoleController.deleteUserRole = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const deletedRole = await UserRole.deleteOne({ _id: id });
    if (deletedRole?.deletedCount) {
      res.json({ message: "User Role deleted successfully" });
    } else {
      res.json({ message: "User Role not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { UserRoleController };
