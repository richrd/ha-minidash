import React from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//import { Record, List, Map } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';

import { toggleNavigation } from './utilities/ui';

import Icon from './Icon';
import ConnectionIndicator from './ConnectionIndicator';
import Navigation from './Navigation';

function HeaderBar() {
  return (
    <header>
      <div id="header-bar" className="header-bar d-flex jc-space-between">
        <button className="btn-plain h-100" alt="Menu" onClick={toggleNavigation} >
          <Icon name="menu" />
        </button>
        <span className="current-view"></span>
        <ConnectionIndicator />
      </div>
      <Navigation />
    </header>
  );
}

// withRouter is used to make sure the active class of nav links update properly
export default withRouter(connect(
  null,
  { tryConnect },
)(HeaderBar));
