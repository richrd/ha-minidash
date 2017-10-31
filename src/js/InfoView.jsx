import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Map } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';
import { setHeader } from './state/actions/header';
import { ConnectionState } from './state/records/connection';

import Icon from './partials/Icon';


class InfoView extends Component {
  static propTypes = {
    connection: PropTypes.instanceOf(ConnectionState).isRequired,
    config: PropTypes.instanceOf(Map).isRequired,
    setHeader: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setHeader('Info', 'information-outline');
  }

  render() {
    const version = __PKG_VERSION__; // eslint-disable-line
    return (
      <div className="text-center d-flex fd-col h-100 jc-space-around info-view">

        <dl>
          <dt>HA Minidash Version</dt>
          <dd>{version}</dd>
          <br />
        </dl>

        <Icon name="home-assistant" size="144" />

        <dl>
          <dt>Home Assistant Version</dt>
          <dd>{this.props.config.get('version')}</dd>
          <br />
          <dt>Timezone</dt>
          <dd>{this.props.config.get('time_zone')}</dd>
          <br />
          <dt>Connection state</dt>
          <dd>{this.props.connection.get('status')}</dd>
          <br />
        </dl>

      </div>
    );
  }
}

export default connect(
  stateToProps('connection', 'config'),
  { tryConnect, setHeader },
)(InfoView);
