const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

const jwtRegex = /^Bearer\s(?<jwt>.+)$/;

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  const match = (req.headers.authorization || "").match(jwtRegex);

  const deleteUserId = () => {
    proxyReq.removeHeader("X-user_id");
  };

  if (!match) return deleteUserId();

  const decoded = jwt.decode(match.groups.jwt);

  if (!decoded?.sub) return deleteUserId();

  proxyReq.setHeader("X-user_id", decoded.sub);
});

router.use("/*", async (req, res, next) => {
  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
