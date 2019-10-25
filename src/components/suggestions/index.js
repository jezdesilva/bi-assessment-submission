import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from "react-router-dom";
import { Button, Divider } from 'semantic-ui-react';
import selectors from '../../selectors';
import { SEARCH_TITLE } from '../../constants';

const Suggestions = ({suggestions, searchType}) => {
  const history = useHistory();

  const handleSuggestionClick = (event) => {
    const query = event.target.name;
    history.push(`/search/${searchType}/${query}/1`);
  }

  return (
    <div>
      {suggestions.length > 0 && <Divider />}
      {suggestions.map((suggestion, index) => (
        <Button style={{ marginBottom: '3px' }} onClick={handleSuggestionClick} name={suggestion} basic key={index}>{suggestion}</Button>
      ))}
    </div>
  );
};

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  searchType: PropTypes.string,
};

Suggestions.defaultProps = {
  suggestions: [],
  searchType: SEARCH_TITLE,
}

const mapStateToProps = createStructuredSelector({
  suggestions: selectors.selectSuggestions,
  searchType: selectors.selectSearchType,
});

export default connect(mapStateToProps, null)(Suggestions);