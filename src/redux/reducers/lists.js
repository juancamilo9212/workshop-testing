/* eslint-disable import/no-named-as-default-member */
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchList, markFavorite, markSeen, markWatchlist,
} from '../actions';
import movieDb from '../../apis/movie-db';

const MAX_HISTORY_LENGTH = 12;

const initialState = () => {
  const result = {
    history: {
      id: 'history',
      name: 'History',
      movies: JSON.parse(localStorage.getItem('movie-history')) || [],
      order: 0,
    },
  };
  Object.entries(movieDb.PREDEFINED_LISTS).forEach(([listId, listDef]) => {
    result[listId] = {
      id: listId,
      name: listDef.name,
      userList: listDef.userList,
      movies: null,
      order: listDef.userList ? 1 : 2,
    };
  });
  return result;
};

const addToArray = (array, elem, maxLength = Infinity) => {
  if (!array.find((other) => other === elem)) {
    return [...array, elem].slice(0, maxLength);
  }
  return array;
};

export default createReducer(initialState(), {
  [fetchList.fulfilled](state, action) {
    const {
      id, name, movies, userList,
    } = action.payload;
    return {
      ...state,
      [id]: {
        ...state[id],
        name,
        userList: !!userList,
        order: userList ? 1 : 2,
        movies: movies.map((movie) => movie.id),
      },
    };
  },

  [markSeen](state, action) {
    const { movieId } = action.payload;
    const newSeenMovies = addToArray(state.history.movies, movieId, MAX_HISTORY_LENGTH);
    localStorage.setItem('movie-history', JSON.stringify(newSeenMovies));
    return {
      ...state,
      history: { ...state.history, movies: newSeenMovies },
    };
  },

  [markFavorite.fulfilled](state, action) {
    const { movieId, mark } = action.payload;
    const favoriteMovies = state.favorites.movies;
    const movies = mark
      ? addToArray(favoriteMovies, movieId)
      : favoriteMovies.filter((id) => id !== movieId);
    return {
      ...state,
      favorites: {
        ...(state.favorites),
        movies,
      },
    };
  },

  [markWatchlist.fulfilled](state, action) {
    const { movieId, mark } = action.payload;
    const watchlistMovies = state.watchlist.movies;
    const movies = mark
      ? addToArray(watchlistMovies, movieId)
      : watchlistMovies.filter((id) => id !== movieId);
    return {
      ...state,
      watchlist: {
        ...(state.watchlist),
        movies,
      },
    };
  },
});
