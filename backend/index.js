const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes
const taskRoutes = require("./routes/taskRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/tasks", taskRoutes);
app.use("/likes", likeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Export the app (do not use app.listen here)
module.exports = app;
