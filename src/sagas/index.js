import { all, fork } from 'redux-saga/effects';
import { listenGetBooksSaga } from './getBooksSagas';
import { listenGetSuggestionsSaga } from './getSuggestionsSagas';

export default function* root() {
  yield all([
    fork(listenGetBooksSaga),
    fork(listenGetSuggestionsSaga),
  ]);
}
