import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchInput } from './index';

import { SEARCH_EVERYTHING } from '../../constants';

describe('searchInput', () => {
  const QUERY = 'test';
  let history;
  let updateSuggestions;
  let clearSuggestions;
  let clearSearch;

  const createContainer = ({ query = '', searchType }) => {
    updateSuggestions = jest.fn();
    clearSuggestions = jest.fn();
    clearSearch = jest.fn();

    return render(
      <Router history={history}>
        <SearchInput
          query={query}
          searchType={searchType}
          updateSuggestions={updateSuggestions}
          clearSuggestions={clearSuggestions}
          clearSearch={clearSearch}
        />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory()
  });

  test('it renders without crashing', () => {
    const { container } = createContainer({})
    expect(container.innerHTML).toMatch('searchInput');
  });

  test('prefills the search box with the query when a query is provided', () => {
    const { getByRole } = createContainer({ query: QUERY })
    expect(getByRole('textbox')).toHaveValue(QUERY);
  });

  test('reacts to the enter key to submit content search box', () => {
    const { getByRole } = createContainer({ query: QUERY, searchType: SEARCH_EVERYTHING });
    fireEvent.keyUp(getByRole('textbox'), { key: 'Enter', keyCode: 13 });
    expect(history.entries.pop().pathname).toMatch(`/search/${SEARCH_EVERYTHING}/${QUERY}/1`);
  });

  test('clicking the search button submits content search box', () => {
    const { container, getByText } = createContainer({ query: QUERY, searchType: SEARCH_EVERYTHING });
    fireEvent.click(getByText('Search'));
    expect(history.entries.pop().pathname).toMatch(`/search/${SEARCH_EVERYTHING}/${QUERY}/1`);
  });

  test('clicking the clear button clears content search box', () => {
    const { getByText, getByRole } = createContainer({ query: QUERY, searchType: SEARCH_EVERYTHING });
    fireEvent.click(getByText('Clear'));
    expect(history.entries.pop().pathname).toMatch(`/`);
    expect(clearSearch).toHaveBeenCalled();
  });
});
