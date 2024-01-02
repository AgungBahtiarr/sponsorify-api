const express = require("express");
const router = express.Router();
const sponsorshipController = require("../controller/sponsorshipController");
const { body } = require("express-validator");

const sponsorshipRules = [
  body("companyName").isString().notEmpty(),
  body("companyDesc").isString().notEmpty(),
  body("province").isString().notEmpty(),
  body("city").isString().notEmpty(),
  body("district").isString().notEmpty(),
  body("completeAddress").isString().notEmpty(),
  body("categoryId").isInt().notEmpty(),
  body("withDrawalTimeId").isInt().notEmpty(),
  body("limitEventSubmission").isInt().notEmpty(),
  body("applicationExpired").isInt().notEmpty(),
  body("reportDeadline").isInt().notEmpty(),
  body("usersId").isInt().notEmpty(),
];

router.get("/", sponsorshipController.getAllSponsorship);
router.get("/:id", sponsorshipController.getDetailSponsorship);
router.post("/", sponsorshipRules, sponsorshipController.addSponsorship);
router.patch("/:id", sponsorshipRules, sponsorshipController.editSponsorship);
router.delete("/:id", sponsorshipController.deleteSponsorship);

module.exports = router;
