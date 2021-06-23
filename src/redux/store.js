import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './reducers/auth';
import requests from './reducers/requests';
import lists from './reducers/lists';
import movies from './reducers/movies';

export const newStore = () => {
  /** The app state is structured as follows.
   *```
  *{
  *  auth: {
  *    isFetching: boolean,
  *    isAuthenticated: boolean,
  *    sessionId: integer,
  *    username: string,
  *    accountId: integer,
  *    avatar: string,
  *    errorMessage: string,
  *  }
  *  requests: {
  *    [request-id]: { // Tracking for all API requests.
  *      pending: boolean,  // Request made but not yet replied.
  *      ok: boolean,       // Request successful.
  *      failed: boolean,   // Request failed.
  *      error: string,     // Error message if the request failed.
  *      timestamp: integer,// When request either failed or succeded.
  *    },
  *  },
  *  lists: { // Lists of movies, e.g. genre or 'latest'.
  *    [list-id]: {
  *      id: integer,
  *      name: string,
  *      movies: [movie-id],
  *    }
  *  },
  *  movies: { // Movies loaded from _The Movie DB_ API.
  *    [movie-id]: {
  *      id: integer,     // Movie id.
  *      title: string,   // Movie title.
  *      poster: string,  // Movie poster id in _The Movie DB_ API.
  *      trailer: string, // YouTube video id for the trailer. Loaded separately.
  *    }
  *  }
  *}
  * ```
  */
  const reducer = {
    auth,
    requests,
    lists,
    movies,
  };
  const middleware = (getDefaultMiddleware) => {
    const result = getDefaultMiddleware();
    if (process?.env?.NODE_ENV === 'development') {
      const logger = createLogger({});
      return result.concat(logger);
    }
    return result;
  };
  return configureStore({
    reducer,
    middleware,
  });
};

export default newStore();
