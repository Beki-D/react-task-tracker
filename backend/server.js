require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.static(path.join(__dirname, "build"))); // Serve React build files

const taskRoutes = require("./routes/taskRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/tasks", taskRoutes);
app.use("/likes", likeRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
