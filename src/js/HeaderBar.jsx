import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { tryConnect } from './state/actions/connection';
import { Header } from './state/records/header';

import { stateToProps } from './utilities';
import { toggleNavigation } from './utilities/ui';

import Icon from './partials/Icon';
import ConnectionIndicator from './ConnectionIndicator';
import Navigation from './Navigation';

function HeaderBar({ header }) {
  return (
    <header>
      <div id="header-bar" className="header-bar d-flex jc-space-between">
        <button className="btn-plain h-100 pr-3" alt="Menu" onClick={toggleNavigation} >
          <Icon name="menu" />
        </button>

        <div className="header-label d-flex">
          {header.icon ?
            <div className="mr-1"><Icon name={header.icon} /></div>
            : null}
          <span>{header.title}</span>
        </div>

        <ConnectionIndicator />
      </div>
      <Navigation />
    </header>
  );
}

HeaderBar.propTypes = {
  header: PropTypes.instanceOf(Header).isRequired,
};


// withRouter is used to make sure the active class of nav links update properly
export default withRouter(connect(
  stateToProps('header'),
  { tryConnect },
)(HeaderBar));
