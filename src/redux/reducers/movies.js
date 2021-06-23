import { createReducer } from '@reduxjs/toolkit';
import {
  fetchList, fetchMovie, fetchTrailer,
} from '../actions';

const initialState = {};

export default createReducer(initialState, {
  [fetchList.fulfilled](state, action) {
    const { movies } = action.payload;
    const newState = { ...state };
    movies.forEach((movie) => {
      const { id, title, poster } = movie;
      newState[id] = {
        id,
        title,
        poster,
        trailer: '', // TODO Valid youtube URL as default
      };
    });
    return newState;
  },

  [fetchMovie.fulfilled](state, action) {
    const { id, title, poster } = action.payload;
    return {
      ...state,
      [id]: {
        id,
        title,
        poster,
        trailer: '', // TODO Valid youtube URL as default
      },
    };
  },

  [fetchTrailer.fulfilled](state, action) {
    const { movieId, trailer } = action.payload;
    return {
      ...state,
      [movieId]: {
        ...(state[movieId]),
        trailer,
      },
    };
  },
});
