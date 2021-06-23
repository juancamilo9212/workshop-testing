import { createReducer } from '@reduxjs/toolkit';
import { login, logout } from '../actions';

const initialState = () => {
  let sessionData = null;
  try {
    sessionData = JSON.parse(localStorage.getItem('session-data'));
  } catch (error) {
    // Do nothing
  }
  sessionData = sessionData || { };
  const { sessionId } = sessionData;
  if (!sessionId) {
    localStorage.removeItem('session-data');
    sessionData = {};
  }
  const {
    accountId, username, avatar, country, language, name,
  } = sessionData;
  return {
    accountId,
    username,
    avatar,
    country,
    language,
    name,
    isFetching: false,
    isAuthenticated: !!sessionId,
  };
};

const loginErrorMessage = (errorResponse) => {
  if (errorResponse) {
    try {
      const errorMessage = JSON.parse(errorResponse)?.status_message;
      if (errorMessage) {
        return errorMessage;
      }
    } catch {
      // Fall through...
    }
  }
  return 'Unknown error on login. Please check your credentials and try again later.';
};

export default createReducer(initialState(), {
  [login.pending]() {
    return {
      isFetching: true,
    };
  },

  [login.fulfilled](state, action) {
    const {
      sessionId, username, accountId, name, avatar, country, language,
    } = action.payload;
    const sessionData = {
      sessionId, username, accountId, name, avatar, country, language,
    };
    localStorage.setItem('session-data', JSON.stringify(sessionData));
    return {
      ...state,
      ...sessionData,
      isFetching: false,
      isAuthenticated: true,
    };
  },

  [login.rejected](state, action) {
    return {
      ...state,
      isFetching: false,
      isAuthenticated: false,
      errorMessage: loginErrorMessage(action.error),
    };
  },

  [logout.fulfilled](state) {
    localStorage.setItem('session-data',
      JSON.stringify({ username: state.username }));
    return {
      username: state.username,
      isFetching: false,
      isAuthenticated: false,
    };
  },
});
