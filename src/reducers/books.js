import {
  SET_BOOKS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  STORE_QUERY,
  SET_SEARCH_TYPE,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  CLEAR_SEARCH,
  SET_LOADING_STATE,
  UPDATE_LOCATION,
  SET_SUGGESTIONS,
  CLEAR_SUGGESTIONS,
} from '../actions/constants';
import { SEARCH_TITLE } from '../constants';

export const initialState = {
  books: [],
  saved: {},
  lastQuery: '',
  searchType: SEARCH_TITLE,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  suggestions: [],
};

// It may appear at first that the state is being mutated in this reducer, but we have immer and redux-immer working in the background to maintain an immutable state (https://www.npmjs.com/package/redux-immer)
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      state.books = action.books;
      return state;
    case ADD_TO_WISHLIST: {
      // added braces to restrict scope of const to within the case clause
      const book = JSON.parse(action.book);
      if (!Object.prototype.hasOwnProperty.call(state.saved, book.key)) {
        state.saved[book.key] = { ...book, onWishList: true };
      }
      return state;
    }
    case REMOVE_FROM_WISHLIST:
      if (Object.prototype.hasOwnProperty.call(state.saved, action.key)) {
        delete state.saved[action.key];
      }
      return state;
    case STORE_QUERY:
      state.lastQuery = action.query;
      state.suggestions =[];
      return state;
    case SET_SEARCH_TYPE:
      state.searchType = action.searchType;
      return state;
    case SET_CURRENT_PAGE:
      state.currentPage = action.currentPage;
      return state;
    case SET_TOTAL_PAGES:
      state.totalPages = action.totalPages;
      return state;
    case CLEAR_SEARCH:
      state.books = [];
      state.suggestions = [];
      state.lastQuery = '';
      state.currentPage = 1;
      state.totalPages = 1;
      return state;
    case SET_LOADING_STATE:
      state.isLoading = action.isLoading;
      return state;
    case UPDATE_LOCATION:
      state.currentPage = action.page;
      state.searchType = action.searchType;
      return state;
    case SET_SUGGESTIONS:
      if (!Array.isArray(action.suggestions)) {
        state.suggestions = [];
      } else {
        state.suggestions = action.suggestions;
      }
      return state;
    case CLEAR_SUGGESTIONS:
      state.suggestions = [];
      return state
    default:
      return state;
  }
};
