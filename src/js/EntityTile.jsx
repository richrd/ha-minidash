import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleEntityState, setSliderValue, runEntityScript } from './api/HaApi';
import {
  entityIsToggleable,
  entityIsScript,
  getEntityIconWithState,
  getWundergroundIconName,
} from './utilities/ha';

import { setEntityState } from './state/actions/entities';


import { haEntity } from './utilities/propTypes';

import Icon from './partials/Icon';
import RadialProgress from './partials/RadialProgress';
import AngleGauge from './partials/AngleGauge';
import EntityInputNumber from './partials/EntityInputNumber';
import EntityInputText from './partials/EntityInputText';

function EntityTile({ entity, toggle, runScript }) {
  if (!entity) {
    return null;
  }

  let unit = '';
  if (entity.attributes && entity.attributes.unit_of_measurement) {
    unit = entity.attributes.unit_of_measurement;
  }
  const [type] = entity.entity_id.split('.');
  const icon = getEntityIconWithState(entity);
  const valLength = `${entity.state}`.length;
  const isShortValue = valLength < 6;
  const iconlessDomains = ['sensor', 'input_text', 'input_number'];


  const clickEntity = () => {
    // Toggle
    if (entityIsToggleable(entity)) {
      toggle(entity);
    }
    // Run script
    if (entityIsScript(entity)) {
      runScript(entity);
    }
  };

  const keyPress = (evt) => {
    const key = evt.key.toLowerCase();
    const keys = ['enter', ' '];
    if (keys.includes(key)) {
      clickEntity();
    }
  };


  let content = null;

  if (unit === '%') {
    content = (<RadialProgress value={entity.state} />);
  } else if (unit === '°') {
    content = (<AngleGauge value={entity.state} />);
  } else {
    content = (
      <div>
        <div className="tile-value">{entity.state}</div>
        <div className="tile-unit">{unit}</div>
      </div>
    );
  }

  // Get the weather symbol if available
  const wundergroundIcon = getWundergroundIconName(entity);

  return (
    <div
      className="entity-tile"
      title={entity.attributes.friendly_name}
      data-state={entity.state}
      data-type={type}
      data-entity-id={entity.entity_id}
      data-short-value={isShortValue}
      onClick={clickEntity}
      onKeyPress={keyPress}
      role="button"
      tabIndex="0"
    >
      <div className="tile-label">{entity.attributes.friendly_name}</div>

      { wundergroundIcon ? <i className={`wu wu-white wu-64 wu-${wundergroundIcon}`} /> : null }

      { type === 'sensor' ?
        <div className="tile-content">
          <div className="tile-state">
            { content }
          </div>
        </div> : null }

      { type === 'input_number' ?
        <div className="tile-content">
          <EntityInputNumber entity={entity} />
        </div>
      : null }

      { type === 'input_text' ?
        <div className="tile-content">
          <EntityInputText entity={entity} />
        </div>
      : null }

      { !iconlessDomains.includes(type) ?
        <div className="tile-icon"><Icon name={icon} /></div>
        : null
      }

    </div>
  );
}


EntityTile.defaultProps = {};

EntityTile.propTypes = {
  entity: haEntity.isRequired, // eslint-disable-line
  toggle: PropTypes.func.isRequired,
  runScript: PropTypes.func.isRequired,
};

export default connect(null, {
  toggle: toggleEntityState,
  runScript: runEntityScript,
  setSlider: setSliderValue,
  setState: setEntityState,
})(EntityTile);
