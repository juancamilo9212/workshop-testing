/* eslint-disable camelcase */
import API from './movie-db-api';

export const getGenreMovies = async (genre) => {
  const { genres } = await API.genres.getMovieList({});
  const genresByName = genres.reduce((obj, ml) => {
    // eslint-disable-next-line no-param-reassign
    obj[ml.name] = ml.id;
    return obj;
  }, {});
  if (!genresByName[genre]) {
    throw new Error(`Could not find the "${genre}" genre!`);
  }
  const genreId = genresByName[genre];
  const genreMovies = await API.genres.getMovies({ id: genreId });
  return genreMovies.results;
};

export const imageURL = (path) => {
  const href = API.common.getImage({ size: 'w500', file: path });
  return new URL(href);
};

export const getYouTubeTrailer = async (movieId) => {
  const videos = (await API.movies.getVideos({ id: movieId })).results;
  const trailers = videos.filter((video) => video.type === 'Trailer');
  if (trailers.length > 0) {
    return trailers[0].key;
  }
  const teasers = videos.filter((video) => video.type === 'Trailer');
  if (teasers.length > 0) {
    return teasers[0].key;
  }
  return null;
};

export const logIn = async (username, password) => {
  const { request_token } = await API.authentication.generateToken();
  const { success } = await API.authentication.validateUser({
    request_token,
    username,
    password,
  });
  if (success) {
    const { session_id } = await API.authentication.generateSession({ request_token });
    return session_id;
  }
  return null;
};

export const logOut = async (sessionId) => {
  await API.authentication.deleteSession({ session_id: sessionId });
};

export const PREDEFINED_LISTS = {
  nowplaying: {
    id: 'nowplaying',
    name: 'Now playing',
    getter: API.movies.getNowPlaying,
  },
  popular: {
    id: 'popular',
    name: 'Popular',
    getter: API.movies.getPopular,
  },
  toprated: {
    id: 'toprated',
    name: 'Top rated',
    getter: API.movies.getTopRated,
  },
  upcoming: {
    id: 'upcoming',
    name: 'Upcoming',
    getter: API.movies.getUpcoming,
  },
  favorites: {
    id: 'favorites',
    name: 'Favorites',
    userList: true,
    getter: API.account.getFavoritesMovies,
  },
  watchlist: {
    id: 'watchlist',
    name: 'Watch list',
    userList: true,
    getter: API.account.getMovieWatchlist,
  },
};

export const userImage = (gravatarHash, pixels) => {
  // TODO Check hash and use identicon if missing.
  const size = pixels || 42;
  const imageHref = `https://www.gravatar.com/avatar/${gravatarHash}?s=${size}`;
  return new URL(imageHref);
};

export default {
  API,
  PREDEFINED_LISTS,
  getGenreMovies,
  getYouTubeTrailer,
  imageURL,
  logIn,
  logOut,
  userImage,
};
