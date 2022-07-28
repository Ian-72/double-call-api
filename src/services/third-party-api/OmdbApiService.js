const axios = require('axios');

class OmdbApiService {
  imdbId;

  apikey;

  constructor(imdbId, apikey) {
    // eslint-disable-next-line no-underscore-dangle
    this._service = axios; // fetch api with axios module
    this.imdbId = imdbId; // set imdb id
    this.apikey = apikey; // set omdb api key
  }

  // eslint-disable-next-line consistent-return
  async getSpecificMovie(movieTitle) {
    try {
      // fetch to omdbapi
      // eslint-disable-next-line no-underscore-dangle
      const { data } = await this._service.get(`https://www.omdbapi.com/?i=${this.imdbId}&apikey=${this.apikey}&t=${movieTitle}`);
      return data.Poster; // returning movie poster data
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = OmdbApiService;
