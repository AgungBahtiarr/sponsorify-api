const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");
const { body } = require("express-validator");

const roleRules = [body("roleName").isString().notEmpty()];

router.get("/", roleController.getAllRole);
router.get("/:id", roleController.getDetailRole);
router.post("/", roleRules, roleController.addRole);
router.patch("/:id", roleRules, roleController.editRole);
router.delete("/:id", roleRules, roleController.deleteRole);

module.exports = router;
