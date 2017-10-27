import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';

import HeaderBar from './HeaderBar';

class App extends Component {
  static propTypes = {
    tryConnect: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.connect();
  }

  connect() {
    console.log('Connect...');
    this.props.tryConnect(
      window.config.apiUrl,
      window.config.password,
    );
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <div id="component-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(App);
