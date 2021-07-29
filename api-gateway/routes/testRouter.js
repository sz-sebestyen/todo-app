const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // const user_id = req.headers["x-user_id"];

  // if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  res.json({ message: "test passed" });
});

module.exports = router;
