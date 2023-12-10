const express = require("express");
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
