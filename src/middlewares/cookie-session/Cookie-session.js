const { nanoid } = require('nanoid');

module.exports = (req, _res, next) => {
  req.session.id = req.session.id || nanoid(8);
  next();
};
