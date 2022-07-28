const createHttpError = require('http-errors');

const Validators = require('./index');

module.exports = (validator) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`);
  }
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error.isJoi) {
        return next(createHttpError(400, { message: error.message }));
      }
      next(createHttpError(500));
    }
  };
};
