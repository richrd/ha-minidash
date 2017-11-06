import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';
import { openNavigation, closeNavigation } from './utilities/ui';

import HeaderBar from './HeaderBar';
import SwipeContainer from './partials/SwipeContainer';


function onSwipe(angle, distance, start, end) {
  // Minimum swipe distance
  const minDistance = 50;
  // Maximum angle compared to x axis
  const maxAngle = 25;

  if (distance < minDistance) {
    return;
  }

  let action = openNavigation;
  if (start.x > end.x) {
    action = closeNavigation;
  }

  // Normalize the angle
  if (Math.abs(angle) > 90) {
    angle = 180 - Math.abs(angle);
  }

  if (Math.abs(angle) <= maxAngle) {
    action();
  }
}

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
      <SwipeContainer
        onSwipe={onSwipe}
      >
        <HeaderBar />
        <main id="component-container">
          {this.props.children}
        </main>
      </SwipeContainer>
    );
  }
}


export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(App);
