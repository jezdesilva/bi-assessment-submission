import { runSaga } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { getBooksSaga } from './getBooksSagas';
import { setBooks, storeQuery, setLoadingState, setTotalPages } from '../actions';
import { bookSearch } from '../api/bookSearch';
import selectors from '../selectors';
import { SEARCH_TITLE, BOOKS_PER_PAGE } from '../constants';


describe('Get Books Saga', () => {
  const query = 'java';
  const action = { query };
  const next = sagaHelper(getBooksSaga(action));
  const mockBooks = {
    numFound: 3,
    docs:
      [
        { title: 'title1', author_name: ['author1'], isbn: ['1', '2', '3', '4'], key: '1' },
        { title: 'title2', author_name: ['author2'], isbn: ['4', '5', '6', '8'], key: '2' },
        { title: 'title3', author_name: ['author3'], isbn: ['9', '10', '11', '12'], key: '3' },
      ]
  };

  next('fire action to store query', (result) => {
    expect(result).toEqual(put(storeQuery(query)));
  });
  next('set the loading state', (result) => {
    expect(result).toEqual(put(setLoadingState(true)));
  });
  next('select searchtype from store', (result) => {
    expect(result).toEqual(select(selectors.selectSearchType));
    return SEARCH_TITLE;
  });
  next('select current search results page from store', (result) => {
    expect(result).toEqual(select(selectors.selectPage));
    return 1;
  });
  next('call api to retrieve search data', (result) => {
    expect(result).toEqual(call(bookSearch, action.query, 1, SEARCH_TITLE, BOOKS_PER_PAGE));
    return mockBooks
  });
  next('fire action to store filtered search result objects', (result) => {
    expect(result).toEqual(put(setBooks(mockBooks)));
  });
  next('set the total pages', (result) => {
    expect(result).toEqual(put(setTotalPages(1)));
  });
  next('set the loading state', (result) => {
    expect(result).toEqual(put(setLoadingState(false)));
  });
  next('it should end', (result) => {
    expect(result).toBeUndefined();
  })
});


