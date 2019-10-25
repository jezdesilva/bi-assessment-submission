import React from 'react';
import PropTypes from 'prop-types';

const SearchAdvisor = ({ query }) => (
  <div>
    Search results for &quot;
    <mark className="queryHighlight">{query}</mark>
    &quot;
  </div>
);

SearchAdvisor.propTypes = {
  query: PropTypes.string.isRequired,
};

export default SearchAdvisor;
