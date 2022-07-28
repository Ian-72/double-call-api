require('dotenv').config();
const createHttpError = require('http-errors');
const OmdbApiService = require('../services/third-party-api/OmdbApiService');
const MoviesService = require('../services/postgres/FavoriteMoviesService');

// eslint-disable-next-line max-len
const omdbApiService = new OmdbApiService(process.env.IMDB_ID, process.env.OMDB_API_KEY); // imdb id and omdb api key
const movieService = new MoviesService();

// getMovies function
const getMovies = (req, res, next) => {
  next(createHttpError(403)); // return 403 forbidden
};

// getMovieByTitle function to get specific movie
const getMovieByTitle = async (req, res) => {
  const { movieTitle } = req.params;

  // get poster url from movieService
  const Poster = await omdbApiService.getSpecificMovie(movieTitle);

  // return success 200
  res.json({
    status: 'success',
    data: {
      posterUrl: Poster,
    },
  });
};

// getFavoriteMovies function to get user favorite movies
const getFavoriteMovies = async (req, res, next) => {
  try {
    // get user favorite movies from movieService
    const favoriteMovies = await movieService.getFavoriteMovies();

    // to get url poster based on movie titles
    const data = await favoriteMovies.map(async (m) => {
      const url = await omdbApiService.getSpecificMovie(m.title);
      return url;
    });
    const getUrl = await Promise.all(data);

    // return success 200
    res.json({
      status: 'success',
      data: {
        posterUrl: getUrl,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    next(createHttpError(500));
  }
};

// postFavoriteMovie function to post user's favorite movie
const postFavoriteMovie = async (req, res, next) => {
  const payload = req.body; // get data from payload
  const { userId } = req.session; // get user id data from session

  try {
    // to insert user's favorite movie in user table with service movieService
    const result = await movieService.addFavoriteMovie(payload, userId);

    // if result not contain id object it will response 400
    if (!result.id) {
      next(createHttpError(400));
    }

    // otherwise return susccess
    res.status(201); // set status code 201

    res.json({
      status: 'success',
      data: {
        id: result.id,
        title: result.title,
        userId: result.user_id,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    next(createHttpError(500));
  }
};

module.exports = {
  getMovies,
  getMovieByTitle,
  getFavoriteMovies,
  postFavoriteMovie,
};
