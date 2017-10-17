import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { toggleEntityState, setSliderValue } from './api/HaApi';
import { entityIsToggleable, getEntityIconWithState } from './utilities/ha';

import Icon from './Icon';
import RadialProgress from './RadialProgress';

function EntityTile({ entity, toggle, setSlider }) {
  if (!entity) {
    return null;
  }

  let unit = '';
  if (entity.attributes && entity.attributes.unit_of_measurement) {
    unit = entity.attributes.unit_of_measurement;
  }

  const [type] = entity.entity_id.split('.');

  const icon = getEntityIconWithState(entity);

  const clickEntity = () => {
    if (entityIsToggleable(entity)) {
      toggle(entity);
    }
  };

  const setRange = (event) => {
    setSlider(entity, event.target.value);
  };

  return (
    <div
      className="entity-tile"
      title={entity.attributes.friendly_name}
      data-state={entity.state}
      data-type={type}
      onClick={clickEntity}
    >
      <div className="tile-label">{entity.attributes.friendly_name}</div>

      { type === 'sensor' ?
        <div className="tile-content">
          <div className="tile-state">
            { unit === '%' ?
              <RadialProgress value={entity.state} /> :
              <div>
                <div className="tile-value">{entity.state}</div>
                <div className="tile-unit">{unit}</div>
              </div>
            }
          </div>
        </div> : null }

      { type === 'input_slider' ?
        <div className="tile-content">
          <div className="w-100">
            <div className="slider d-flex">
              <span className="min">{entity.attributes.min}</span>
              <input
                type="range"
                defaultValue={entity.state}
                min={entity.attributes.min}
                max={entity.attributes.max}
                step={entity.attributes.step}
                onChange={event => setRange(event, entity)}
              />
              <span className="max">{entity.attributes.max}</span>
            </div>
            <div className="tile-value">{parseFloat(entity.state).toString()}</div>
          </div>
        </div>
      : null }

      { type !== 'sensor' && type !== 'input_slider' ?
        <div className="tile-icon"><Icon name={icon} /></div>
        : null
      }

    </div>

  );
}


EntityTile.defaultProps = {};

EntityTile.propTypes = {
  entity: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default connect(null, {
  toggle: toggleEntityState,
  setSlider: setSliderValue,
})(EntityTile);
