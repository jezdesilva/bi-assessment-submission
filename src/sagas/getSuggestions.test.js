import { runSaga } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { getSuggestionsSaga } from './getSuggestionsSagas';
import { setSuggestions } from '../actions';
import { bookSearch } from '../api/bookSearch';
import selectors from '../selectors';
import { SEARCH_TITLE } from '../constants';


describe('Get Suggestions Saga', () => {
  const query = 'java';
  const action = { query };
  const next = sagaHelper(getSuggestionsSaga(action));
  const mockBooks = {
    numFound: 3,
    docs:
      [
        { title: 'java1', author_name: ['author1'], isbn: ['1', '2', '3', '4'], key: '1' },
        { title: 'java2', author_name: ['author2'], isbn: ['4', '5', '6', '8'], key: '2' },
        { title: 'java3', author_name: ['author3'], isbn: ['9', '10', '11', '12'], key: '3' },
      ]
  };

  next('select searchtype from store', (result) => {
    expect(result).toEqual(select(selectors.selectSearchType));
    return SEARCH_TITLE;
  });
  next('call api to retrieve suggestion data', (result) => {
    expect(result).toEqual(call(bookSearch, action.query, 1, SEARCH_TITLE, 10));
    return mockBooks
  });
  next('fire action to store filtered suggestions result objects', (result) => {
    expect(result).toEqual(put(setSuggestions(mockBooks, SEARCH_TITLE, query )));
  });
  next('it should end', (result) => {
    expect(result).toBeUndefined();
  })
});


