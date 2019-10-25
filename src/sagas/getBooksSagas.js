import {
  select,
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import { GET_BOOKS } from '../actions/constants';
import { BOOKS_PER_PAGE } from '../constants';
import { setBooks, storeQuery, setLoadingState, setTotalPages } from '../actions';
import { bookSearch } from '../api/bookSearch';
import selectors from '../selectors';

export function* getBooksSaga(props) {
  const { query } = props;
  yield put(storeQuery(query));
  yield put(setLoadingState(true));
  const searchType = yield select(selectors.selectSearchType);
  const page = yield select(selectors.selectPage);
  const books = yield call(bookSearch, query, page, searchType, BOOKS_PER_PAGE);
  yield put(setBooks(books));
  const totalPages = Math.ceil(books.numFound / BOOKS_PER_PAGE);
  yield put(setTotalPages(totalPages));
  yield put(setLoadingState(false));
}

// eslint-disable-next-line import/prefer-default-export
export function* listenGetBooksSaga() {
  yield takeLatest(GET_BOOKS, getBooksSaga);
}
