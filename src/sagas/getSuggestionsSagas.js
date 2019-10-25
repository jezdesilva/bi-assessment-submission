import {
  select,
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import { GET_SUGGESTIONS } from '../actions/constants';
import { NUMBER_OF_SUGGESTIONS } from '../constants';
import { setSuggestions } from '../actions';
import { bookSearch } from '../api/bookSearch';
import selectors from '../selectors';

export function* getSuggestionsSaga(props) {
  const { query } = props;
  const searchType = yield select(selectors.selectSearchType);
  const suggestions = yield call(bookSearch, query, 1, searchType, NUMBER_OF_SUGGESTIONS);
  yield put(setSuggestions(suggestions, searchType, query));
}

// eslint-disable-next-line import/prefer-default-export
export function* listenGetSuggestionsSaga() {
  yield takeLatest(GET_SUGGESTIONS, getSuggestionsSaga);
}
