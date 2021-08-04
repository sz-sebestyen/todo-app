const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

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

module.exports = getUserId;
