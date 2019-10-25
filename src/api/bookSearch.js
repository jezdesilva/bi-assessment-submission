import { SEARCH_TITLE, BOOKS_PER_PAGE } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export async function bookSearch(query, page = 1, searchType = SEARCH_TITLE, limit = BOOKS_PER_PAGE) {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?${searchType}=${query}&limit=${limit}&page=${page}`);
    return response.json();
  }
  catch (error) {
    console.log(error)
  }
  return {};
}
