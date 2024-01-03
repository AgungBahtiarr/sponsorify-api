const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { body } = require("express-validator");

const categoryRules = [body("categoryName").isString().notEmpty()];

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getDetailCategory);
router.post("/", categoryRules, categoryController.addCategory);
router.patch("/:id", categoryRules, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
