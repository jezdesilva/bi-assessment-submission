import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchTypeSelector } from './index';
import {
  SEARCH_TITLE,
  SEARCH_AUTHOR,
} from '../../constants';

describe('SearchTypeSelector', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('renders without crashing', () => {
    const { container } = render(
      <Router history={history}>
        <SearchTypeSelector searchType={SEARCH_TITLE} />
      </Router>
    );
    expect(container.innerHTML).toMatch('searchTypeSelector');

  });

  test('should match the snapshot', () => {
    const { container } = render(
      <Router history={history}>
        <SearchTypeSelector searchType={SEARCH_TITLE} />
      </Router>
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  test('highlights the default selected type', () => {
    const { container } = render(
      <Router history={history}>
        <SearchTypeSelector />
      </Router>
    );

    const titleButton = container.querySelector('button[name="title"]');
    expect(titleButton.outerHTML).toMatch('active');
  });

  test('highlights the currently selected type', () => {
    const { container } = render(
      <Router history={history}>
        <SearchTypeSelector searchType={SEARCH_AUTHOR} />
      </Router>
    );

    const titleButton = container.querySelector('button[name="author"]');
    expect(titleButton.outerHTML).toMatch('active');
  });

  test('handles a cick on search type button correctly', () => {
    const { getByText } = render(
      <Router history={history}>
        <SearchTypeSelector searchType={SEARCH_TITLE} />
      </Router>
    );

    fireEvent.click(getByText(/Author/i));
    expect(history.entries.pop().pathname).toMatch('author');
  })
});