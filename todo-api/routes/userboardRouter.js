const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  const user_id = req.headers["x-user_id"];
  if (user_id) {
    res.json({ message: "Hello world" });
  } else {
    res.status(401).json({ message: "Hello world" });
  }
});

module.exports = router;
