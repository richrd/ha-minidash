import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateToProps } from '../utilities';
import { ConnectionState } from '../state/records/connection';


function NotificationBubble({ connection }) {
  const showStates = ['connecting', 'disconnected'];
  const messages = {
    connecting: 'Connecting...',
    disconnected: 'Disconnected',
    connected: 'Connected',
  };

  let className = 'message-bubbles';
  if (showStates.includes(connection.get('status'))) {
    className += ' show';
  }
  return (
    <div className={className}>
      <div className="message-bubble">
        {messages[connection.get('status')]}
      </div>
    </div>
  );
}


NotificationBubble.defaultProps = {};

NotificationBubble.propTypes = {
  connection: PropTypes.instanceOf(ConnectionState).isRequired, // eslint-disable-line
};

export default connect(stateToProps('connection'))(NotificationBubble);
