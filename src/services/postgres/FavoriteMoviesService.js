// eslint-disable-next-line camelcase
const { favorite_movies } = require('../../models/index');

class MoviesService {
  constructor() {
    // eslint-disable-next-line camelcase
    this._movies = favorite_movies;
  }

  // addFavoriteMovie service to add user's favorite movies from favorite_movies table
  async addFavoriteMovie({ movieTitle }, userId) {
    const moviPayload = { title: movieTitle, user_id: userId }; // get title and user id

    // insert movie title and user id
    const result = await this._movies.create(moviPayload);
    return result;
  }

  // getFavoriteMovies service to get user's favorite movies from favorite_movies table
  async getFavoriteMovies() {
    const favoriteMovies = await this._movies.findAll({ raw: true }); // select all
    return favoriteMovies;
  }
}

module.exports = MoviesService;
