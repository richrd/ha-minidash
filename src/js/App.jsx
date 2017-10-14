import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Record, List, Map } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';

import StateViewer from './StateViewer';

class App extends Component {
  static propTypes = {
    tryConnect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Connect is delayed just for testing purposes
    setTimeout(
      () => this.props.tryConnect(
        window.config.apiUrl,
        window.config.password,
      ),
      1000,
    );
  }


  render() {
    return (
      <div>
        Well hi there! HA Dashboard is still being built, stay tuned!
        <StateViewer />
      </div>
    );
  }
}

export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(App);
