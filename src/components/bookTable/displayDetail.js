import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import Highlighter from 'react-highlight-words';
import {
  SEARCH_EVERYTHING,
} from '../../constants';

const HightlightText = ({ query, active, detail_name, searchDetail }) => {
  if (!active) {
    return <Button basic fluid name={detail_name} onClick={searchDetail}>{detail_name}</Button>;
  }

  return (
    <Button basic fluid name={detail_name} onClick={searchDetail}>
      <Highlighter
        highlightClassName="queryHighlight"
        searchWords={[query]}
        autoEscape
        caseSensitive={false}
        textToHighlight={detail_name}
      />
    </Button>
  );
};

const DisplayDetail = ({ query, searchType, searchTypeMatch, detail_names }) => {
  if (!detail_names) {
    return <div />;
  }

  const isActive = query && (searchType === searchTypeMatch || searchType === SEARCH_EVERYTHING);
  const history = useHistory();
  const searchDetail = ({ currentTarget }) => {

    const { name } = currentTarget;
    history.push(`/search/${searchTypeMatch}/${name}/1`);
  }

  switch(true) {
    case (typeof detail_names === 'string'):
      return <HightlightText query={query} active={isActive} detail_name={detail_names} searchDetail={searchDetail} />;
    case (Array.isArray(detail_names)):
      return detail_names.map((detail_name, index) => <DisplayDetail query={query} searchType={searchType} searchTypeMatch={searchTypeMatch} detail_names={detail_name} key={index} />);
    default:
      return <div />;
  }
}

DisplayDetail.propTypes = {
  query: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  detail_names: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  searchTypeMatch: PropTypes.string,
}

DisplayDetail.defaultProps = {
  detail_names: undefined,
}

export default DisplayDetail;