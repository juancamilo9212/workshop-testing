/* eslint-disable no-restricted-syntax */
import dataGetNowPlaying from './movie-now_playing.json';
import dataGetPopular from './movie-popular.json';
import dataGetTopRated from './movie-top_rated.json';
import dataGetUpcoming from './movie-upcoming.json';

const unimplementedMock = (name) => {
  const errorMessage = `A mock for ${name} is not implemented!`;
  return async () => {
    throw new Error(errorMessage);
  };
};

const datasets = [
  dataGetNowPlaying, dataGetPopular, dataGetTopRated, dataGetUpcoming,
];

const getById = async ({ id }) => {
  for (const data of datasets) {
    const result = data.results.find((movie) => movie.id === id);
    if (result) {
      return result;
    }
  }
  throw new Error(JSON.stringify({
    status_code: 404,
    status_message: `Movie ${id} not found!`,
  }));
};

const getVideos = async ({ movieId }) => {
  const video = {
    id: '??????',
    iso_639_1: 'en',
    iso_3166_1: 'US',
    key: 'vbvQzWDCuXU',
    name: 'Not really a trailer',
    site: 'YouTube',
    size: 1080,
    type: 'Trailer',
  };
  return {
    id: movieId,
    results: [video],
  };
};

const getImage = ({ size, file }) => `http://image.tmdb.org/t/p/${size}/${file}`;

const API = {
  account: {
    getInformation: unimplementedMock('API.account.getInformation'),
    getFavoritesMovies: unimplementedMock('API.account.getFavoritesMovies'),
    getLists: unimplementedMock('API.account.getLists'),
    getMovieWatchlist: unimplementedMock('API.account.getMovieWatchlist'),
  },
  common: {
    client: unimplementedMock('API.common.client'),
    getImage,
  },
  genres: {
    getMovieList: unimplementedMock('API.genres.getMovieList'),
    getMovies: unimplementedMock('API.genres.getMovies'),
  },
  movies: {
    getById, // : unimplementedMock('API.mock.getById'),
    getLatest: unimplementedMock('API.movies.getLatest'),
    getNowPlaying: async () => dataGetNowPlaying,
    getPopular: async () => dataGetPopular,
    getTopRated: async () => dataGetTopRated,
    getUpcoming: async () => dataGetUpcoming,
    getVideos, // : unimplementedMock('API.mock.getVideos'),
  },
};

export default API;
