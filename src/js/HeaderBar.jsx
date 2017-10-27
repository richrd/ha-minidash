import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { tryConnect } from './state/actions/connection';

import { toggleNavigation } from './utilities/ui';

import Icon from './partials/Icon';
import ConnectionIndicator from './ConnectionIndicator';
import Navigation from './Navigation';

function HeaderBar() {
  return (
    <header>
      <div id="header-bar" className="header-bar d-flex jc-space-between">
        <button className="btn-plain h-100 pr-3" alt="Menu" onClick={toggleNavigation} >
          <Icon name="menu" />
        </button>
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
