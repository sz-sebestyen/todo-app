const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const identifyUser = (req, res, next) => {
  const match = (req.headers.authorization || "").match(
    /^Bearer\s(?<jwt>.+)$/i
  );

  if (!match) return next();

  try {
    const decoded = jwt.verify(match.groups.jwt, JWT_SECRET);

    req.userId = decoded?.sub;
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = identifyUser;
