const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  if (!req.headers.authorization) return;

  const split = req.headers.authorization.split(" ");

  const deleteUserId = () => {
    proxyReq.removeHeader("X-user_id");
  };

  if (split[0] !== "Bearer" || !split[1]) return deleteUserId();

  const decoded = jwt.decode(split[1]);

  if (!decoded?.sub) return deleteUserId();

  proxyReq.setHeader("X-user_id", decoded.sub);
});

router.use("/*", async (req, res, next) => {
  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
