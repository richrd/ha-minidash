import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';
import { getEntitiesInGroup } from './utilities/ha';

import EntityTiles from './EntityTiles';


function GroupView({ entities, match }) { // eslint-disable-line

  const { groupId } = match.params;
  const groupEntities = getEntitiesInGroup(entities, groupId);

  return (
    <div className="group-view">
      <EntityTiles entities={groupEntities} />
    </div>
  );
}

GroupView.propTypes = {
  entities: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  stateToProps('entities'),
  { tryConnect },
)(GroupView);
