const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  const user_id = req.headers["x-user_id"];
  if (user_id) {
    res.json();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
