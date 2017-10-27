import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { setSliderValue } from '../api/HaApi';
import { setEntityState } from '../state/actions/entities';
import { haEntity } from '../utilities/propTypes';

class EntityInputText extends Component {
  static propTypes = {
    entity: haEntity.isRequired,
    setEntityState: PropTypes.func.isRequired,
    setSliderValue: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.debounce = 1000;
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
        <textarea
          value={entity.state}
          className="flex-stretch"
          onChange={this.setValue} />
    );
  }
}

export default connect(null, { setSliderValue, setEntityState })(EntityInputText);
