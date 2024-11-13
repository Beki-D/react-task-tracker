const express = require("express");
const router = express.Router();

let likes = { count: 0 }; // Example in-memory data

router.get("/", (req, res) => {
  res.json(likes);
});

router.put("/", (req, res) => {
  likes.count += 1;
  res.json(likes);
});

module.exports = router;
