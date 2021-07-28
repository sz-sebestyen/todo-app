const express = require("express");
const router = express.Router();
const Userboard = require("../models/Userboard");

router.get("/", async (req, res, next) => {
  const user_id = req.headers["x-user_id"];

  if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  const userboard = await Userboard.findOneAndUpdate(
    { user_id },
    { user_id },
    { upsert: true, new: true }
  );

  res.json(userboard);
});

module.exports = router;
