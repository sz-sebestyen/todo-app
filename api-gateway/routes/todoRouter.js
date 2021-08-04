const express = require("express");
const router = express.Router();
const getUserId = require("./getUserId");

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.removeHeader("X-user_id");

  const userId = getUserId(req.headers.authorization);

  userId && proxyReq.setHeader("X-user_id", userId);
});

router.use("/*", async (req, res, next) => {
  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
