const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", userController.getAllUser);
router.post("/", userController.addUser);
router.get("/:id", userController.getDetailUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
module.exports = router;
