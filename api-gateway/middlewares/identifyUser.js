const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const identifyUser = (req, res, next) => {
  const match = (req.headers.authorization || "").match(
    /^Bearer\s(?<jwt>.+)$/i
  );

  if (!match) return next();

  jwt.verify(match.groups.jwt, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.userId = decoded?.sub;
    }

    next();
  });
};

module.exports = identifyUser;
