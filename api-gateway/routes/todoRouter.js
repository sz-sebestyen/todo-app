const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

const { JWT_SECRET } = process.env;

proxy.on("error", function (e) {
  console.log(e);
});

const getUserId = (auth = "") => {
  const match = auth.match(/^Bearer\s(?<jwt>.+)$/i);

  if (!match) return;

  try {
    const decoded = jwt.verify(match.groups.jwt, JWT_SECRET);

    return decoded?.sub;
  } catch (error) {
    console.log(error);
  }
};

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.removeHeader("X-user_id");

  const userId = getUserId(req.headers.authorization);

  userId && proxyReq.setHeader("X-user_id", userId);
});

router.use("/*", async (req, res, next) => {
  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
