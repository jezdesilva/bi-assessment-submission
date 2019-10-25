import { createSelector } from 'reselect';

const highlight = (text, searchTerm) => {
  switch (true) {
    case Array.isArray(text):
      return text.map(textItem => highlight(textItem, searchTerm));
    case (typeof text === 'string'):
      return text.replace(new RegExp(searchTerm, 'gi'), match => ({ __html: `<mark>${match}</mark>` }));
    default:
      return text;
  }
};

const selectRoot = () => state => state.booksReducer;

const selectLastQuery = createSelector(
  selectRoot(),
  (substate) => {
    const result = substate.lastQuery;
    return result;
  },
);

const selectPage = createSelector(
  selectRoot(),
  substate => substate.currentPage,
);

const selectTotalPages = createSelector(
  selectRoot(),
  substate => substate.totalPages,
);

const selectSearchResults = createSelector(
  selectRoot(),
  substate => substate.books,
);

const selectWishListBooksObject = createSelector(
  selectRoot(),
  substate => substate.saved,
);

const selectHighlightedSearchResults = (highlightSearchQuery = false) => createSelector(
  selectSearchResults,
  selectWishListBooksObject,
  selectLastQuery,
  (searchResults, wishlist, query) => {
    const wishlistKeys = Object.keys(wishlist);
    const highlightedSearchresults = [];
    searchResults.forEach((searchResultItem) => {
      const { author_name, title } = searchResultItem;
      const authorName = author_name ? author_name.join(', ') : 'unknown';
      const searchResultTaggedWithWishlistFlag = {
        ...searchResultItem,
        onWishList: wishlistKeys.includes(searchResultItem.key)
      };
      if (!highlightSearchQuery) {
        highlightedSearchresults.push(searchResultTaggedWithWishlistFlag);
      } else {
        // was going to implement the highlighted text matches using the dangerouslySetInnerHTML react DOM attribute
        // https://reactjs.org/docs/dom-elements.html
        highlightedSearchresults.push({
          ...searchResultTaggedWithWishlistFlag,
          author_name: highlight(authorName, query),
          title: highlight(title, query),
        });
      }
    });
    return highlightedSearchresults;
  },
);

const selectWishListBooks = createSelector(
  selectWishListBooksObject,
  wishlist => Object.values(wishlist),
);

const selectSearchType = createSelector(
  selectRoot(),
  substate => substate.searchType,
);

const selectloadingState = createSelector(
  selectRoot(),
  substate => substate.isLoading,
);

const selectSuggestions = createSelector(
  selectRoot(),
  substate => substate.suggestions,
);

export default {
  selectLastQuery,
  selectPage,
  selectTotalPages,
  selectSearchResults,
  selectWishListBooks,
  selectHighlightedSearchResults,
  selectSearchType,
  selectloadingState,
  selectSuggestions,
};
