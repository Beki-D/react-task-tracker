const express = require("express");
const router = express.Router();

let tasks = []; // Use your real database or in-memory data

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
