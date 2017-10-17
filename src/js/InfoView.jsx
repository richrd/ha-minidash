import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Record, List, Map } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';

import Icon from './Icon';


function InfoView({ connection, config, entities }) {
  return (
    <div className="text-center d-flex fd-col h-100 jc-space-around info-view">
      <div>
        <Icon name="home-assistant" size="144" />
        <dl>

          <dt>HA Version</dt>
          <dd>{config.get('version')}</dd>
          <br />

          <dt>Timezone</dt>
          <dd>{config.get('time_zone')}</dd>
          <br />


          <dt>Connection state</dt>
          <dd>{connection.get('status')}</dd>
          <br />

        </dl>
      </div>
    </div>
  );
}

InfoView.propTypes = {
  connection: PropTypes.instanceOf(Record).isRequired,
  config: PropTypes.instanceOf(Map).isRequired,
  entities: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(InfoView);
