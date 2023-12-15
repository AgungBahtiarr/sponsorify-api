const express = require("express");
const {
  getAllEvent,
  getDetailEvent,
} = require("../controller/eventController");
const app = express();

const router = express.Router();

router.get("/", getAllEvent);
router.get("/:id", getDetailEvent);

module.exports = router;
