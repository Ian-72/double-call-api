const router = require('express').Router();
const moviesController = require('../controller/movies.controller');
const Validator = require('../middlewares/validator/Validator');
const Authenticate = require('../middlewares/authenticate/Authenticate');

// * Movie routes
router.get('/', Authenticate, moviesController.getMovies);
router.get('/favorite', Authenticate, moviesController.getFavoriteMovies);
router.post('/favorite', Authenticate, Validator('movie'), moviesController.postFavoriteMovie);
router.get('/:movieTitle', Authenticate, moviesController.getMovieByTitle);

module.exports = router;
