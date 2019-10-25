import { combineReducers } from 'redux-immer';
import { connectRouter } from 'connected-react-router';
import produce from 'immer';

import booksReducer from './books';

export default history => combineReducers(produce, {
  router: connectRouter(history),
  booksReducer
});
