const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

const getUserId = (auth = "") => {
  const match = auth.match(/^Bearer\s(?<jwt>.+)$/i);

  if (!match) return;

  try {
    const decoded = jwt.decode(match.groups.jwt);

    return decoded?.sub;
  } catch (error) {
    console.log(error);
  }
};

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  const userId = getUserId(req.headers.authorization);

  userId
    ? proxyReq.setHeader("X-user_id", userId)
    : proxyReq.removeHeader("X-user_id");
});

router.use("/*", async (req, res, next) => {
  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
