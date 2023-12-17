const express = require("express");
const eventController = require("../controller/eventController");
const router = express.Router();
const { body } = require("express-validator");

const eventRules = [
  body("eventName").isString().notEmpty(),
  body("eventDesc").isString().notEmpty(),
  body("eventDate").isString().notEmpty(),
  body("completeAddress").isString().notEmpty(),
  body("mapsLink").isString().notEmpty(),
  body("userId").isInt().notEmpty(),
  body("city").isString().notEmpty(),
  body("province").isString().notEmpty(),
  body("district").isString().notEmpty(),
];

router.get("/", eventController.getAllEvent);
router.get("/:id", eventController.getDetailEvent);
router.post("/", eventRules, eventController.addEvent);
router.patch("/:id", eventRules, eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
