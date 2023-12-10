const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();
const { body } = require("express-validator");

const userSchema = [
  body("username").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  body("roleId").isInt().notEmpty(),
];

router.get("/", userController.getAllUser);
router.post("/", userSchema, userController.addUser);
router.get("/:id", userController.getDetailUser);
router.patch("/:id", userSchema, userController.updateUser);
router.delete("/:id", userController.deleteUser);
module.exports = router;
