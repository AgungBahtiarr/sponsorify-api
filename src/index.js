const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const authMiddleware = require("./middleware/authMiddleware");
const userRouters = require("./routes/users");
const authRouters = require("./routes/auth");
const eventRouters = require("./routes/event");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/users", authMiddleware, userRouters);
app.use("/auth", authRouters);
app.use("/events", authMiddleware, eventRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
