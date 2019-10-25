import reducer, { initialState } from './books';
import {
  SET_BOOKS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  STORE_QUERY,
  SET_SEARCH_TYPE,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  CLEAR_SEARCH,
  SEARCH_TITLE,
  SEARCH_AUTHOR,
  SEARCH_EVERYTHING,
} from '../actions/constants';

describe('Book reducers', () => {
  let mockBookData0;
  let mockBookData1;
  let mockBookData2;
  let mockBookDataObject;
  let wishListItem1;
  let wishListItem2;


  beforeEach(() => {
    mockBookData0 = {
      title: 'title1',
      author_name: ['author1'],
      isbn: ['1', '2', '3', '4'],
      key: 'w0'
    };
    mockBookData1 = {
      title: 'title2',
      author_name: ['author2'],
      isbn: ['5', '6', '7', '8'],
      key: 'w1'
    };
    mockBookData2 = {
      title: 'title3',
      author_name: ['author3'],
      isbn: ['9', '10', '11', '12'],
      key: 'w2'
    };
    mockBookDataObject = [
      mockBookData0,
      mockBookData1,
      mockBookData2,
    ];
    wishListItem1 = { ...mockBookData1, onWishList: true };
    wishListItem2 = { ...mockBookData2, onWishList: true };
  });

  describe('should deal with actions correctly', () => {
    test('should return the initial state when an empty action is passed in', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
    test('should add books to the store', () => {
      expect(reducer(undefined, { type: SET_BOOKS, books: mockBookDataObject })).toEqual({ ...initialState, books: mockBookDataObject });
    });
    test('should add books to the wishlist', () => {
      const previousState = { ...initialState, books: mockBookDataObject };
      const expectedWishListObject = { w2: { ...mockBookData2, onWishList: true } };
      expect(reducer(previousState, { type: ADD_TO_WISHLIST, book: JSON.stringify(mockBookData2) })).toEqual({ ...previousState, saved: expectedWishListObject });
    });
    test('should remove items from the wishlist', () => {
      const previousState = { ...initialState, books: mockBookDataObject, saved: { w2: wishListItem2, w1: wishListItem1 } };
      const expectedState = { ...initialState, books: mockBookDataObject, saved: { w1: wishListItem1 } };
      expect(reducer(previousState, { type: REMOVE_FROM_WISHLIST, key: 'w2' })).toEqual(expectedState);
    });
    test('should store the search query', () => {
      expect(reducer(undefined, { type: STORE_QUERY, query: 'java' })).toEqual({ ...initialState, lastQuery: 'java' });
    });
    test('should set the search type', () => {
      expect(reducer({ ...initialState, searchType: 'something else' }, { type: SET_SEARCH_TYPE, searchType: SEARCH_TITLE })).toEqual({ ...initialState, searchType: SEARCH_TITLE });
      expect(reducer({ ...initialState, searchType: 'something else' }, { type: SET_SEARCH_TYPE, searchType: SEARCH_AUTHOR })).toEqual({ ...initialState, searchType: SEARCH_AUTHOR });
      expect(reducer({ ...initialState, searchType: 'something else' }, { type: SET_SEARCH_TYPE, searchType: SEARCH_EVERYTHING })).toEqual({ ...initialState, searchType: SEARCH_EVERYTHING });
    });
    test('should store the current pagination offset', () => {
      expect(reducer(undefined, { type: SET_CURRENT_PAGE, currentPage: 56 })).toEqual({ ...initialState, currentPage: 56 });
    });
    test('should store the total number of search result pages', () => {
      const previousState = { ...initialState, books: mockBookDataObject, saved: { w2: wishListItem2, w1: wishListItem1 } };
      const expectedState = { ...previousState, totalPages: 2394 };
      expect(reducer(previousState, { type: SET_TOTAL_PAGES, totalPages: 2394 })).toEqual(expectedState);
    });
    test('should clear the search data from the store', () => {
      const previousState = {
        ...initialState,
        books: mockBookDataObject,
        lastQuery: 'java',
        saved: { w2: wishListItem2, w1: wishListItem1 }
      };
      const expectedState = {
        ...previousState,
        books: [],
        lastQuery: '',
        currentPage: 1
      };
      expect(reducer(previousState, { type: CLEAR_SEARCH })).toEqual(expectedState);
    });
  });
});
