const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const authMiddleware = require("./middleware/authMiddleware");
const userRouters = require("./routes/users");
const authRouters = require("./routes/auth");
const eventRouters = require("./routes/event");
const roleRouters = require("./routes/role");
const sponsorshipRouters = require("./routes/sponsorship");

const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "public/images");
    } else if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.ms-powerpoint" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, "public/proposals");
    } else {
      cb(Error("File ext not allowed"));
    }
  },
  filename: (req, file, cb) => {
    var mimetype = file.mimetype.split("/");
    const ext = mimetype[1];
    cb(null, Date.now() + "." + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || "image/jpg" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/users", authMiddleware, userRouters);
app.use("/api/auth", authRouters);
app.use("/api/events", authMiddleware, eventRouters);
app.use("/api/roles", authMiddleware, roleRouters);
app.use(
  "/api/sponsorship",
  [multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")],
  sponsorshipRouters
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
