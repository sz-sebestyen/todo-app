const express = require("express");
const router = express.Router();

const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.setHeader("X-user_id", "asdfasdf");
});

router.use("/*", async (req, res, next) => {
  // const user_id = req.headers["x-user_id"];

  // if (!user_id) return res.status(401).json({ message: "Unauthorized" });

  proxy.web(req, res, { target: `http://localhost:3001/${req.params[0]}` });
});

module.exports = router;
