const express = require("express");
const { body } = require("express-validator");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const registerSchema = [
  body("username").isString().notEmpty(),
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  body("roleId").isInt().notEmpty(),
];
const loginSchema = [
  body("email").isEmail().notEmpty(),
  body("password").isString().notEmpty(),
];

router.post("/register", registerSchema, authController.register);
router.post("/login", loginSchema, authController.login);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
