import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingNotification = ({ show }) => (

  <Dimmer active={show} page>
    <Loader>Loading...</Loader>
  </Dimmer>
);

LoadingNotification.propTypes = {
  show: PropTypes.bool,
}

LoadingNotification.defaultProps = {
  show: false,
}

export default LoadingNotification;