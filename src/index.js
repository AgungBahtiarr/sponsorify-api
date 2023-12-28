const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const authMiddleware = require("./middleware/authMiddleware");
const userRouters = require("./routes/users");
const authRouters = require("./routes/auth");
const eventRouters = require("./routes/event");
const roleRouters = require("./routes/role");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", authMiddleware, userRouters);
app.use("/api/auth", authRouters);
app.use("/api/events", authMiddleware, eventRouters);
app.use("/api/roles", authMiddleware, roleRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
