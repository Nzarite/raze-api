"use strict";

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const User = mongoose.model("User");
const UserRole = mongoose.model("UserRole");
const UserController = {};

UserController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

UserController.getUserPermissions = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: id, isActive: true });
    if (!user) {
      return res.json("User not found/deleted");
    }
    res.json({ permissions: user.permissions });
  } catch (err) {
    next(err);
  }
};

UserController.getUserById = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: id, isActive: true });
    if (!user) {
      return res.json("User not found/deleted");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

UserController.addUser = async (req, res, next) => {
  try {
    const inputUserRole = req.body.user.role;
    const userRoles = await UserRole.find({}).sort({ priority: -1 });

    const { _id: userRoleId, priority: userRolePriorty } =
      userRoles.find(
        ({ role }) =>
          role.toLowerCase() === inputUserRole.toLowerCase(),
      );

    const userPermissions = [];
    for (let userRole of userRoles) {
      if (userRole.priority <= userRolePriorty) {
        userPermissions.push(...userRole.permissions);
      }
    }

    const user = new User(req.body.user);
    user.role = userRoleId;
    user.permissions = userPermissions;

    await user.save();

    res.json({ message: "user saved successfully!", id: user._id });
  } catch (err) {
    next(err);
  }
};

UserController.deleteUser = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: id, isActive: true });
    if (user) {
      user.isActive = false;
      await user.save();
      res.json({ message: "User Deleted Successfully" });
    } else {
      res.json({ message: "user does not exist" });
    }
  } catch (err) {
    next(err);
  }
};

UserController.editUser = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: id, isActive: true });
    if (!user) {
      return res.json("User not found/deleted");
    }
    const { user: userPayload } = req.body;
    const userRoles = await UserRole.find({}).sort({ priority: -1 });

    const { _id: userRoleId, priority: userRolePriorty } =
      userRoles.find(
        ({ role }) =>
          role.toLowerCase() === userPayload.role.toLowerCase(),
      );

    const userPermissions = [];
    for (let userRole of userRoles) {
      if (userRole.priority <= userRolePriorty) {
        userPermissions.push(...userRole.permissions);
      }
    }

    user.permissions = userPermissions;
    user.role = userRoleId;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { UserController };
