const express = require("express");
const router = express.Router();

// Routes
const userRoutes = require("./routes/user.route");
const taskRoutes = require("./routes/task.route");

// Endpoints
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/tasks", taskRoutes);

module.exports = router;
