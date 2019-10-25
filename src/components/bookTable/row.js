import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon } from 'semantic-ui-react';
import CoverImage from '../coverImage';
import DisplayDetail from './displayDetail';
import {
  SEARCH_EVERYTHING,
  SEARCH_TITLE,
  SEARCH_AUTHOR,
  COVER_IMAGE,
} from '../../constants';

const TableRow = ({
  book,
  query,
  searchType,
  handleAddToWishList,
  handleRemoveFromWishlist,
}) => {
  const {
    author_name, title, isbn, key, onWishList
  } = book;
  const isbnCode = Array.isArray(isbn) && isbn.length ? isbn[0] : null;
  const coverImgUri = COVER_IMAGE.replace('{isbnCode}', isbnCode);

  return (
    <Table.Row>
      <Table.Cell><CoverImage title={title} isbnCode={isbnCode} coverImgUri={coverImgUri} /></Table.Cell>
      <Table.Cell>
        <DisplayDetail query={query} searchType={searchType} detail_names={title} searchTypeMatch={SEARCH_TITLE} />
      </Table.Cell>
      <Table.Cell>
        <DisplayDetail query={query} searchType={searchType} detail_names={author_name} searchTypeMatch={SEARCH_AUTHOR} />
      </Table.Cell>
      <Table.Cell>
        <div>
          {!onWishList ? (
            <Button
              className="wishlistButton"
              icon
              labelPosition="left"
              fluid
              color="teal"
              name={JSON.stringify(book)}
              onClick={handleAddToWishList}
            >
              <Icon name="heart" />
              Save to wishlist
            </Button>
          ) : (
            <Button
              className="wishlistButton"
              icon
              labelPosition="left"
              fluid
              color="red"
              name={key}
              onClick={handleRemoveFromWishlist}
            >
              <Icon name="remove circle" />
              Remove from wishlist
            </Button>
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

TableRow.propTypes = {
  book: PropTypes.object.isRequired,
  query: PropTypes.string,
  searchType: PropTypes.string,
  handleAddToWishList: PropTypes.func.isRequired,
  handleRemoveFromWishlist: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  query: '',
  searchType: SEARCH_EVERYTHING,
};

export default TableRow;
