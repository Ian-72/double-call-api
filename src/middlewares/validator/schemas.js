const Joi = require('joi');

const movieSchema = Joi.object({
  movieTitle: Joi.string().required(),
});

module.exports = movieSchema;
