import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Table } from 'semantic-ui-react';
import selectors from '../../selectors'
import Row from './row';
import { SEARCH_EVERYTHING } from '../../constants';
import {
  addToWishlist, removeFromWishlist
} from '../../actions';

export const BookTable = ({
  books,
  query,
  searchType,
  isLoading,
  addToWishlist,
  removeFromWishlist,
}) => {
  const handleAddToWishList = (event) => {
    addToWishlist(event.target.name);
  };
  const handleRemoveFromWishlist = (event) => {
    // eslint-disable-next-line react/destructuring-assignment
    removeFromWishlist(event.target.name);
  };

  return (
    <Table striped size="large" className="bookList">
      <Table.Body>
        {!isLoading && books && Array.isArray(books) && books.map((book, index) => {
          const { key } = book;
          return (
            <Row
              key={key}
              book={book}
              query={query}
              searchType={searchType}
              handleAddToWishList={handleAddToWishList}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          )}
        )
      }
      </Table.Body>
    </Table>
  );

};

BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string,
  searchType: PropTypes.string,
  isLoading: PropTypes.bool,
}

BookTable.defaultProps = {
  query: '',
  searchType: SEARCH_EVERYTHING,
  isLoading: false,
}
const mapStateToProps = createStructuredSelector({
  searchType: selectors.selectSearchType,
});

const mapDispatchToProps = dispatch => ({
  addToWishlist: key => dispatch(addToWishlist(key)),
  removeFromWishlist: key => dispatch(removeFromWishlist(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookTable);
