import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Divider } from 'semantic-ui-react';
import BookResultsTable from '../../components/bookTable';
import selectors from '../../selectors';
import styles from './styles';

export const Wishlist = ({ books }) => (
  <div style={styles.container}>
    <Divider />
    {books.length > 0
      ? (
        <div>
          <BookResultsTable books={books} />
        </div>
      ) : (
        <div>
          No items have been saved to your Wishlist
        </div>
      )
    }
  </div>
);

Wishlist.propTypes = {
  books: PropTypes.array.isRequired,
};


const mapStateToProps = createStructuredSelector({
  books: selectors.selectWishListBooks,
});

export default connect(mapStateToProps, null)(Wishlist);
