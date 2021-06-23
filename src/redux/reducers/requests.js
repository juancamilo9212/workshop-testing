import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

const fulfilledRegExp = /^(.*)\/fulfilled$/;
const pendingRegExp = /^(.*)\/pending$/;
const rejectedRegExp = /^(.*)\/rejected$/;

export default createReducer(initialState, {}, [
  {
    matcher: (action) => fulfilledRegExp.test(action.type),
    reducer: (state, action) => {
      const [, actionType] = fulfilledRegExp.exec(action.type);
      return {
        ...state,
        [actionType]: { ok: true, timestamp: Date.now() },
      };
    },
  },
  {
    matcher: (action) => pendingRegExp.test(action.type),
    reducer: (state, action) => {
      const [, actionType] = pendingRegExp.exec(action.type);
      return {
        ...state,
        [actionType]: { pending: true, timestamp: Date.now() },
      };
    },
  },
  {
    matcher: (action) => rejectedRegExp.test(action.type),
    reducer: (state, action) => {
      const [, actionType] = rejectedRegExp.exec(action.type);
      return {
        ...state,
        [actionType]: { error: action.error, timestamp: Date.now() },
      };
    },
  },
]);
