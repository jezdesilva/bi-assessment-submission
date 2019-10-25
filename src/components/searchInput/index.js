import React, { useState } from 'react';
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
  clearSearch,
  storeQuery,
  getSuggestions,
  clearSuggestions,
} from '../../actions';
import {
  SEARCH_TITLE,
  SUGGESTION_CHAR_THRESHOLD
} from '../../constants';

export const SearchInput = ({ query: queryProp, searchType, clearSearch, updateSuggestions, clearSuggestions }) => {
  const [query, setQuery] = useState(queryProp);
  const history = useHistory();

  const keyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchBtnOnClick();
    }
    const text = event.target.value;
    if (text.length > SUGGESTION_CHAR_THRESHOLD) {
      updateSuggestions(text);
    } else {
      clearSuggestions();
    }
  }

  const handleSearchBtnOnClick = () => {
    history.push(`/search/${searchType}/${query}/1`);
  }

  const handleClearBtnOnClick = () => {
    clearSearch();
    history.push(`/`);
  }

  const updateSearchQuery = (event) => {
    event.persist();
    setQuery(event.target.value);
  }

  return (
    <div className="ui action input loading icon">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onKeyUp={keyPress}
        onChange={updateSearchQuery}
        className="searchInput"
      />
      <Button
        color="teal"
        onClick={handleSearchBtnOnClick}
        className="searchBtn"
      >
        <Icon name="search" />
        Search
      </Button>
      <Button
        color="red"
        onClick={handleClearBtnOnClick}
        className="clearBtn"
      >
        <Icon name="delete" />
        Clear
      </Button>
    </div>
  );
}

SearchInput.propTypes = {
  query: PropTypes.string,
  searchType: PropTypes.string,
}

SearchInput.defaultProps = {
  query: '',
  searchType: SEARCH_TITLE,
}

const mapStateToProps = createStructuredSelector({
  query: selectors.selectLastQuery,
  searchType: selectors.selectSearchType,
});


const mapDispatchToProps = dispatch => ({
  clearSearch: () => dispatch(clearSearch()),
  storeQuery: query => dispatch(storeQuery(query)),
  updateSuggestions: text => dispatch(getSuggestions(text)),
  clearSuggestions: () => dispatch(clearSuggestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
