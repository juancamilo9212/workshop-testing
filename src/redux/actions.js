/* eslint-disable import/no-named-as-default-member */
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import movieDb from '../apis/movie-db';

const movieFromRequest = (data) => ({
  id: data.id,
  title: data.title,
  poster: data.poster_path,
});

const movieListFromRequest = (id, name, userList, data) => ({
  id,
  name,
  userList,
  movies: data.results.map(movieFromRequest),
});

// Fetching from TMDB.

export const fetchList = createAsyncThunk(
  'lists/fetch',
  async ({ sessionId, accountId, listId }) => {
    const listDef = movieDb.PREDEFINED_LISTS[listId];
    const data = await listDef.getter({ session_id: sessionId, id: accountId });
    return movieListFromRequest(listId, listDef.name, listDef.userList, data);
  },
);

export const fetchMovie = createAsyncThunk(
  'movies/fetch',
  async ({ movieId }) => {
    const data = await movieDb.API.movies.getById({ id: movieId });
    return movieFromRequest(data);
  },
);

export const fetchTrailer = createAsyncThunk(
  'movies/fetchTrailer',
  async ({ movieId }) => {
    const trailer = await movieDb.getYouTubeTrailer(movieId);
    return { movieId, trailer };
  },
);

// Authentication.

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const sessionId = await movieDb.logIn(username, password);
    const account = await movieDb.API.account.getInformation({ session_id: sessionId });
    return {
      sessionId,
      username,
      accountId: account.id,
      avatar: account.avatar?.gravatar?.hash ?? null,
      country: account.iso_3166_1,
      language: account.iso_639_1,
      name: account.name,
    };
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ sessionId }) => movieDb.logOut(sessionId),
);

// Marking movies.

export const markSeen = createAction(
  'mark-seen',
  ({ movieId }) => ({ payload: { movieId } }),
);

export const markFavorite = createAsyncThunk(
  'movies/mark-favorite',
  async ({
    sessionId, accountId, movieId, mark,
  }) => {
    await movieDb.API.account.addFavorite({
      session_id: sessionId,
      id: accountId,
      media_type: 'movie',
      media_id: movieId,
      favorite: mark,
    });
    return { movieId, mark };
  },
);

export const markWatchlist = createAsyncThunk(
  'movies/mark-watchlist',
  async ({
    sessionId, accountId, movieId, mark,
  }) => {
    await movieDb.API.account.addToWatchlist({
      session_id: sessionId,
      id: accountId,
      media_type: 'movie',
      media_id: movieId,
      watchlist: mark,
    });
    return { movieId, mark };
  },
);
