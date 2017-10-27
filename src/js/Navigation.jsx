import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { List, Map } from 'immutable';
import { stateToProps } from './utilities';

import { toggleNavigation } from './utilities/ui';
import { getGroups, getEntityIcon, getEntityById, entityIsHidden } from './utilities/ha';

import Icon from './partials/Icon';

function Navigation({ config, entities }) {
  const haLocation = config.get('location_name');

  let groupEntities = [];
  if (!window.config.groups) {
    groupEntities = getGroups(entities)
      .sort((a, b) => {
        if (a.entity_id < b.entity_id) { return -1; }
        if (a.entity_id > b.entity_id) { return 1; }
        return 0;
      });
  } else {
    window.config.groups.forEach((id) => {
      groupEntities.push(getEntityById(entities, `group.${id}`));
    });
  }

  const groupNavItems = [];

  groupEntities.forEach((entity) => {
    if (!entity) {
      return;
    }
    if (!entityIsHidden(entity)) {
      const icon = getEntityIcon(entity);
      const groupName = entity.entity_id.split('.')[1];
      const el = (
        <li key={entity.entity_id}>
          <NavLink to={`/group/${groupName}`} onClick={toggleNavigation} activeClassName="active">
            <Icon name={icon} />
            <span>
              {entity.attributes.friendly_name}
            </span>
          </NavLink>
        </li>
      );
      groupNavItems.push(el);
    }
  });

  return (
    <div id="navigation">

      <nav className="nav-menu">

        <div className="nav-top d-flex fd-row px-1 jc-space-between">
          <h1><Icon name="home-assistant" /><span className="ml-1">{haLocation}</span></h1>
          <button className="btn-plain h-100 pl-3" onClick={toggleNavigation}>
            <Icon name="close" />
          </button>
        </div>

        <div className="nav-content">
          <ul className="nav-items">

            <li className="header">
              <h2>Groups</h2>
            </li>

            {groupNavItems}

            <li className="header">
              <h2>Tools</h2>
            </li>

            <li>
              <NavLink to="/info" activeClassName="active" onClick={toggleNavigation} >
                <Icon name="information-outline" /><span>Info</span>
              </NavLink>
            </li>
            { window.config.debug ?
              <li>
                <NavLink to="/debug" activeClassName="active" onClick={toggleNavigation} >
                  <Icon name="bug" /><span>Debug</span>
                </NavLink>
              </li> : null }

          </ul>
        </div>

      </nav>
      <div
        className="nav-backdrop"
        onClick={toggleNavigation}
        role="button"
        tabIndex="0"
      />
    </div>
  );
}

Navigation.propTypes = {
  config: PropTypes.instanceOf(Map).isRequired,
  entities: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  stateToProps('connection', 'config', 'entities'),
  null,
  null,
  { pure: false },
)(Navigation);
