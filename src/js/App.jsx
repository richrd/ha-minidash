import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';
import { openNavigation, closeNavigation, toggleNavigation } from './utilities/ui';

import HeaderBar from './HeaderBar';
import SwipeContainer from './partials/SwipeContainer';
import NotificationBubble from './partials/NotificationBubble';


const onKeyDown = (evt) => {
  const key = evt.key.toLowerCase();
  // Trigger nav with m (m for menu)
  if (key === 'm') {
    toggleNavigation();
  }
};

const onSwipe = (angle, distance, start, end) => {
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
};

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

  componentDidMount() {
    this.parentElement.focus();
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
      <div
        onKeyDown={onKeyDown}
        ref={(parent) => { this.parentElement = parent; }}
        tabIndex="-1"
        role="button"
      >
        <SwipeContainer
          onSwipe={onSwipe}
        >
          <HeaderBar />
          <main id="component-container">
            {this.props.children}
          </main>
        </SwipeContainer>
        <NotificationBubble />
      </div>
    );
  }
}


export default connect(
  stateToProps('connection', 'config', 'entities'),
  { tryConnect },
)(App);
