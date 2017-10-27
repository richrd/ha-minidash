import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ name, size }) {
  return <i className={`mdi mdi-${name} mdi-${size}px`} />;
}


Icon.defaultProps = {
  size: '24', // 18, 24, 36, 48
};


Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};
