# BI Assessment Submission

# Features
- uses `Open Library Api`
- search by  title, author or both (search type)
- change search type after results have rendered to initiate a new search with the same query
- click to add book to wishlist
- remove book from wishlist either from the search page or the wishlist page
- new searches highlight items that were previously added to wishlist
- shows loading indicator while loading content over network
- shows a bocken image link when an image fails to load
- click on author names to search for that author
- click on the title to search for book with that title
- search results page is paginated
- uses react router for navigation
- search suggestions appear after a few charaters have been entered, with in the context of the search type
- uses `Immer` and `Redux-Immer` (instead of `ImmutableJs`) to ensure an immutable store, while providing a more natural api
- Reducers, selectors, sagas and most components are unit tested using Jest, `Enzyme` and `react @testing-library`
- used `mCodex/react-redux-saga-boilerplate` as a starting point
- used `why-did-you-render` to check for unwanted rerenders

## Installation

Clone repo and run:

```
yarn && yarn start
```
