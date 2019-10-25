import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import selectors from '../../selectors';
import {
  setSearchType,
} from '../../actions';

import {
  SEARCH_EVERYTHING,
  SEARCH_TITLE,
  SEARCH_AUTHOR,
  TITLE_TEXT,
  AUTHOR_TEXT,
  EVERYTHING_TEXT,
} from '../../constants';

export const SearchTypeSelector = ({ query, searchType }) => {
  const history = useHistory();
  // const { rQuery } = useParams();

  const handleSearchTypeBtnOnClick = (event) => {
    const newSearchType = event.target.name;
    history.push(`/search/${newSearchType}/${query}/1`);
  }

  return (
    <Button.Group floated="right" className="searchTypeSelector">
      <Button active={searchType === SEARCH_TITLE} name={SEARCH_TITLE} onClick={handleSearchTypeBtnOnClick}>
        <Icon name="book" />
        {TITLE_TEXT}
      </Button>
      <Button.Or />
      <Button active={searchType === SEARCH_AUTHOR} name={SEARCH_AUTHOR} onClick={handleSearchTypeBtnOnClick}>
        <Icon name="user" />
        {AUTHOR_TEXT}
      </Button>
      <Button.Or />
      <Button active={searchType === SEARCH_EVERYTHING} name={SEARCH_EVERYTHING} onClick={handleSearchTypeBtnOnClick}>
        <Icon name="check" />
        {EVERYTHING_TEXT}
      </Button>
    </Button.Group>
  );
}

SearchTypeSelector.propTypes = {
  searchType: PropTypes.string.isRequired,
}

SearchTypeSelector.defaultProps = {
  query: '',
  searchType: SEARCH_TITLE,
}

const mapStateToProps = createStructuredSelector({
  query: selectors.selectLastQuery,
  searchType: selectors.selectSearchType,
});


const mapDispatchToProps = dispatch => ({
  setSearchType: searchType => dispatch(setSearchType(searchType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTypeSelector);
