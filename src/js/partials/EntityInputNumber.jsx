import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { setSliderValue } from '../api/HaApi';
import { setEntityState } from '../state/actions/entities';
import { haEntity } from '../utilities/propTypes';

class EntityInputNumber extends Component {
  static propTypes = {
    entity: haEntity,
    setEntityState: PropTypes.func.isRequired,
    setSliderValue: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.debounce = 500;
    this.timeout = null;
  }

  setValue = (event) => {
    const { value } = event.target;
    this.props.setEntityState(this.props.entity, value);
    // Debounce the actual sending of the state change
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.sendValue(value), this.debounce);
  };

  sendValue = (value) => {
    this.props.setSliderValue(this.props.entity, value);
  }

  render() {
    const { entity } = this.props;

    return (
      <div className="w-100">
        <div className="tile-value">{parseFloat(entity.state).toString()}</div>
        <div className="slider d-flex">
          <span className="min">{entity.attributes.min}</span>
          <input
            type="range"
            value={entity.state}
            min={entity.attributes.min}
            max={entity.attributes.max}
            step={entity.attributes.step}
            onChange={this.setValue}
          />
          <span className="max">{entity.attributes.max}</span>
        </div>
      </div>
    );
  }
}

export default connect(null, { setSliderValue, setEntityState })(EntityInputNumber);
