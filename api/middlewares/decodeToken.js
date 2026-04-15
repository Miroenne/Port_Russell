const jwt = require ("jsonwebtoken");

function decodeToken(req, res, next) {
  const token = req.cookies.token;
  req.decoded = jwt.verify(token, process.env.SECRET_KEY);
  next();
};

module.exports = decodeToken;