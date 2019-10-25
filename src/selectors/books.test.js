import bookSelectors from './books';
import {
  SEARCH_TITLE,
} from '../constants';

describe('Book Selectors', () => {
  let mockState;
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
    mockState = {
      booksReducer: {
        books: mockBookDataObject,
        saved: {
          w1: wishListItem1,
          w2: wishListItem2,
        },
        lastQuery: 'java',
        searchType: SEARCH_TITLE,
        currentPage: 57,
        totalPages: 1,
        isLoading: false,
      }
    };
  });

  describe('', () => {
    test('should select the last search query', () => {
      expect(bookSelectors.selectLastQuery(mockState)).toEqual(mockState.booksReducer.lastQuery);
    });
    test('should select the pagination offset', () => {
      expect(bookSelectors.selectPage(mockState)).toEqual(mockState.booksReducer.currentPage);
    });
    test('should select the total number of pages', () => {
      expect(bookSelectors.selectTotalPages(mockState)).toEqual(mockState.booksReducer.totalPages);
    });
    test('should select the loading status', () => {
      expect(bookSelectors.selectloadingState(mockState)).toEqual(mockState.booksReducer.isLoading);
    });
    test('should select the search results', () => {
      expect(bookSelectors.selectSearchResults(mockState)).toEqual(mockState.booksReducer.books);
    });
    test('should select the wish list', () => {
      const expectedresult = [wishListItem1, wishListItem2];
      expect(bookSelectors.selectWishListBooks(mockState)).toEqual(expectedresult);
    });
    test('should select the search results tagged with the wish list data', () => {
      const expectedresult = [{ ...mockBookData0, onWishList: false }, { ...mockBookData1, onWishList: true }, { ...mockBookData2, onWishList: true }];
      expect(bookSelectors.selectHighlightedSearchResults()(mockState)).toEqual(expectedresult);
    });
    test('should select the search type', () => {
      expect(bookSelectors.selectSearchType(mockState)).toEqual(mockState.booksReducer.searchType);
    });
  });
});
