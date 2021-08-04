const express = require("express");
const router = express.Router();

router.use("/*", async (req, res, next) => {
  const { userId } = req;

  if (userId) {
    res.json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
