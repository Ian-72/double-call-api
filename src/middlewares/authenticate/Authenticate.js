require('dotenv').config();
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, userId) => {
      if (err) {
        return createHttpError(403);
      }
      req.session.userId = userId;
      next();
    });
  } else {
    next(createHttpError(401));
  }
};

module.exports = authenticateJWT;
