import {
  GET_BOOKS,
  SET_BOOKS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  STORE_QUERY,
  CLEAR_SEARCH,
  SET_SEARCH_TYPE,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  SET_LOADING_STATE,
  UPDATE_LOCATION,
  GET_SUGGESTIONS,
  SET_SUGGESTIONS,
  CLEAR_SUGGESTIONS,
} from './constants';
import {
  SEARCH_AUTHOR,
  SEARCH_TITLE,
} from '../constants';

export const setBooks = books => {
  const filteredBookData = books.docs.map(
    ({
      title,
      author_name,
      isbn,
      key,
    }) => ({
      title,
      author_name,
      isbn,
      key,
    })
  );
  return {
    type: SET_BOOKS,
    books: filteredBookData,
  };
}

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});


export const setTotalPages = totalPages => ({
  type: SET_TOTAL_PAGES,
  totalPages,
});

export const getBooks = query => ({
  type: GET_BOOKS,
  query
});

export const addToWishlist = book => ({
  type: ADD_TO_WISHLIST,
  book,
});

export const removeFromWishlist = key => ({
  type: REMOVE_FROM_WISHLIST,
  key,
});

export const storeQuery = query => ({
  type: STORE_QUERY,
  query,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const setSearchType = searchType => ({
  type: SET_SEARCH_TYPE,
  searchType
});


export const setLoadingState = isLoading => ({
  type: SET_LOADING_STATE,
  isLoading
});

export const updateLocation = ({ query, page, searchType }) => ({
  type: UPDATE_LOCATION,
  page,
  searchType,
});

export const getSuggestions = query => ({
  type: GET_SUGGESTIONS,
  query
});

export const setSuggestions = (suggestions, searchType, query ) => {
  let filteredSuggestions = [];

  if (searchType !== SEARCH_TITLE) {
    filteredSuggestions.push(
      suggestions.docs.map(suggestion => {
      const { author_name:authors } = suggestion;
        if (typeof authors === 'string' ) {
          return authors;
        }
        if (Array.isArray(authors)) {
          return authors.filter(author => author.toLowerCase().match(query.toLowerCase()))
        }
        return 'null';
      })
    );
  }
  if (searchType !== SEARCH_AUTHOR) {
    filteredSuggestions.push(suggestions.docs.map(suggestion => {
      const { title } = suggestion;
      return title;
    }));
  }

  const flattenedSuggestions = Array.prototype.concat.apply([], filteredSuggestions)

  const sanitizedSuggestions = flattenedSuggestions
    .filter(flattenedSuggestion => (
      flattenedSuggestion && typeof flattenedSuggestion === 'string' && flattenedSuggestion.toLowerCase() !== query.toLowerCase()
    ));

  return {
    type: SET_SUGGESTIONS,
    suggestions: [...new Set(sanitizedSuggestions)],
  };
}

export const clearSuggestions = () => ({
  type: CLEAR_SUGGESTIONS,
});