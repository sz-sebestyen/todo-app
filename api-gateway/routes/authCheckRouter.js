const express = require("express");
const router = express.Router();
const getUserId = require("./getUserId");

router.use("/*", async (req, res, next) => {
  const userId = getUserId(req.headers.authorization);

  if (userId) {
    res.json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
