const express = require("express");
const router = express.Router();

const { CLIENT_ID, REDIRECT_URI } = process.env;

const query = [
  `response_type=code`,
  `client_id=${CLIENT_ID}`,
  `scope=openid%20email`,
  `redirect_uri=${REDIRECT_URI}`,
  `prompt=select_account`,
].join("&");

const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;

router.get("/", async (req, res, next) => {
  res.redirect(googleUrl);
});

module.exports = router;
