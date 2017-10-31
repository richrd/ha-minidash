import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List } from 'immutable';
import { stateToProps } from './utilities';
import { tryConnect } from './state/actions/connection';
import { setHeader } from './state/actions/header';
import { getEntitiesInGroup, getEntityById, getEntityIcon } from './utilities/ha';

import EntityTiles from './EntityTiles';


class GroupView extends Component {
  static propTypes = {
    entities: PropTypes.instanceOf(List).isRequired,
    setHeader: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    console.log(props.entities);
    this.setHeader(props.entities, props.match.params.groupId);
  }

  componentDidMount() {
    this.setHeader(this.props.entities, this.props.match.params.groupId);
  }

  componentWillReceiveProps(props) {
    this.setHeader(props.entities, props.match.params.groupId);
  }

  setHeader(entities, groupId) {
    const group = getEntityById(entities, `group.${groupId}`);
    if (group) {
      const icon = getEntityIcon(group);
      this.props.setHeader(group.attributes.friendly_name, icon);
    }
  }

  render() {
    const { groupId } = this.props.match.params;
    const groupEntities = getEntitiesInGroup(this.props.entities, groupId);

    return (
      <div className="group-view">
        <EntityTiles entities={groupEntities} />
      </div>
    );
  }
}

GroupView.propTypes = {
  entities: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  stateToProps('entities'),
  { tryConnect, setHeader },
)(GroupView);
