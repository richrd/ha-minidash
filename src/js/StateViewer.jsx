import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Record, List, Map } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';

function StateViewer({ connection, config, entities }) {
  return (
    <div>
      <h3>connection</h3>
      <pre>
        {JSON.stringify(connection, null, 4)}
      </pre>

      <h3>config</h3>
      <pre>
        {JSON.stringify(config, null, 4)}
      </pre>

      <h3>entities</h3>
      <pre>
        {JSON.stringify(entities, null, 4)}
      </pre>
    </div>
  );
}

StateViewer.propTypes = {
  connection: PropTypes.instanceOf(Record).isRequired,
  config: PropTypes.instanceOf(Map).isRequired,
  entities: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(StateViewer);
