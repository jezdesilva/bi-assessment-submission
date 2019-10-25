import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { Divider } from 'semantic-ui-react';
import BookResultsTable from '../../components/bookTable';
import PaginationSelector from '../../components/pagination';
import selectors from '../../selectors';
import {
  getBooks,
  setCurrentPage,
  setSearchType,
  updateLocation,
} from '../../actions';
import styles from './styles';
import SearchInput from '../../components/searchInput';
import SearchType from '../../components/searchTypeSelector';
import SearchAdvisor from '../../components/searchAdvisor';
import LoadingNotification from '../../components/loadingNotification';
import Suggestions from '../../components/suggestions';
import {
  SEARCH_EVERYTHING,
  SEARCH_TITLE,
  SEARCH_AUTHOR,
} from '../../constants';

export const Home = ({
  books,
  searchType,
  query,
  isLoading,
  page,
  getBooks,
  setSearchType,
  updateLocation,
}) => {
  const {
    rType,
    rQuery,
    rPage,
  } = useParams();

  const pageNumberUpdated = parseInt(rPage, 10) !== parseInt(page, 10);
  const queryUpdated = rQuery !== query;
  const typeUpdated =
    (
      rType === SEARCH_EVERYTHING ||
      rType === SEARCH_TITLE ||
      rType === SEARCH_AUTHOR
    ) &&
    rType !== searchType;
  if (rPage && rQuery && rType) {
    if (pageNumberUpdated || queryUpdated || typeUpdated) {
      updateLocation({
        searchType: rType,
        page: rPage,
      })
      setSearchType(rType);
      setCurrentPage(rPage);
      getBooks(rQuery);
    }
  }

  return (
    <div style={styles.container}>
      <Divider />
      <SearchInput />
      <SearchType searchType={searchType} />
      <Suggestions />
      <Divider />
      <LoadingNotification show={isLoading} />
      {books.length > 0 && (
        <div>
          <SearchAdvisor query={query} />
          <Divider />
          <PaginationSelector />
          <BookResultsTable books={books} query={query} searchType={searchType} />
          <PaginationSelector />
          <Divider />
        </div>
      )}
    </div>
  )
};

Home.propTypes = {
  books: PropTypes.array,
  query: PropTypes.string,
  searchType: PropTypes.string,
  isLoading: PropTypes.bool,
  rType: PropTypes.string,
  rQuery: PropTypes.string,
  rPage: PropTypes.string,
};

Home.defaultProps = {
  books: [],
  query: '',
  searchType: SEARCH_TITLE,
  isLoading: false,
};

const mapStateToProps = createStructuredSelector({
  books: selectors.selectHighlightedSearchResults(),
  query: selectors.selectLastQuery,
  searchType: selectors.selectSearchType,
  isLoading: selectors.selectloadingState,
  page: selectors.selectPage,
});

const mapDispatchToProps = dispatch => ({
  getBooks: query => dispatch(getBooks(query)),
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  setSearchType: searchType => dispatch(setSearchType(searchType)),
  updateLocation: ({ page, searchType }) => dispatch(updateLocation({ page, searchType })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
