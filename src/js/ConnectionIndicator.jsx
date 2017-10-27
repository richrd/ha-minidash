import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Record } from 'immutable';
import { stateToProps } from './utilities';

import Icon from './partials/Icon';


function ConnectionIndicator({ connection }) {
  let iconName = 'signal-off';
  let className = '';
  if (connection.status === 'connected') {
    iconName = 'signal';
  } else if (connection.status === 'connecting') {
    className = 'pulse-opacity';
  }

  return (
    <div className={`status-${connection.status} ${className}`}>
      <Icon name={iconName} />
    </div>
  );
}

ConnectionIndicator.propTypes = {
  connection: PropTypes.instanceOf(Record).isRequired,
};

export default connect(stateToProps('connection'))(ConnectionIndicator);
