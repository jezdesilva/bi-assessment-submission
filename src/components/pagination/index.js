import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";
import { Pagination, Container } from 'semantic-ui-react';
import selectors from '../../selectors'

const PaginationSelector = ({ currentPage, totalPages, query, searchType }) => {
  const history = useHistory();
  const handlePageChange = (e, { activePage }) => {
    history.push(`/search/${searchType}/${query}/${activePage}`);
  }
  return (
    <Container textAlign='center'>
      <Pagination defaultActivePage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </Container>
  )
};

PaginationSelector.propTypes= {
  currentPage: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
}

const mapStateToProps = createStructuredSelector({
  currentPage: selectors.selectPage,
  totalPages: selectors.selectTotalPages,
  query: selectors.selectLastQuery,
  searchType: selectors.selectSearchType,
});

export default connect(mapStateToProps, null)(PaginationSelector);