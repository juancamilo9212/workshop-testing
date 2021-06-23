import theMovieDb from 'themoviedb-javascript-library';
import promisify from './promisify';

if (!process.env.REACT_APP_THEMOVIEDB_API_KEY) {
  // eslint-disable-next-line no-undef
  if (!jest) { // Not running tests.
    // eslint-disable-next-line no-console
    console.warn('Key for The Movie DB API is not available!');
  }
} else {
  theMovieDb.common.api_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
}

// Versions of API methods, promisified and parsing the JSON result.
const API = {
  account: {
    getInformation: promisify(theMovieDb.account.getInformation, JSON.parse),
    getFavoritesMovies: promisify(theMovieDb.account.getFavoritesMovies, JSON.parse),
    getLists: promisify(theMovieDb.account.getLists, JSON.parse),
    getMovieWatchlist: promisify(theMovieDb.account.getMovieWatchlist, JSON.parse),
  },
  authentication: {
    generateToken: promisify(theMovieDb.authentication.generateToken, JSON.parse),
    validateUser: promisify(theMovieDb.authentication.validateUser, JSON.parse),
    generateSession: promisify(theMovieDb.authentication.generateSession, JSON.parse),
  },
  common: {
    client: promisify(theMovieDb.common.client, JSON.parse),
    getImage: theMovieDb.common.getImage,
  },
  genres: {
    getMovieList: promisify(theMovieDb.genres.getMovieList, JSON.parse),
    getMovies: promisify(theMovieDb.genres.getMovies, JSON.parse),
  },
  movies: {
    getById: promisify(theMovieDb.movies.getById, JSON.parse),
    getLatest: promisify(theMovieDb.movies.getLatest, JSON.parse),
    getNowPlaying: promisify(theMovieDb.movies.getNowPlaying, JSON.parse),
    getPopular: promisify(theMovieDb.movies.getPopular, JSON.parse),
    getTopRated: promisify(theMovieDb.movies.getTopRated, JSON.parse),
    getUpcoming: promisify(theMovieDb.movies.getUpcoming, JSON.parse),
    getVideos: promisify(theMovieDb.movies.getVideos, JSON.parse),
  },
};

// Workaround false rejection when removing movies from lists.
API.account.addFavorite = (...args) => (
  promisify(theMovieDb.account.addFavorite, JSON.parse)(...args)
    .catch((reason) => {
      if (reason instanceof Error) throw reason;
    })
);
API.account.addToWatchlist = (...args) => (
  promisify(theMovieDb.account.addToWatchlist, JSON.parse)(...args)
    .catch((reason) => {
      if (reason instanceof Error) throw reason;
    })
);

API.authentication.deleteSession = promisify(
  (options, onSuccess, onError) => (
    API.common.client(
      {
        method: 'DELETE',
        status: 200,
        url: `authentication/session${theMovieDb.common.generateQuery(options)}`,
      },
      onSuccess,
      onError,
    )
  ),
  JSON.parse,
);

export default API;
