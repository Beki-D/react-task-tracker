const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://task-tracker-reactjs-three.vercel.app/"],
  })
);
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/tasks", taskRoutes);
app.use("/likes", likeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
