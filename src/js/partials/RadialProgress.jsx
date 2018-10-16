import React from 'react';
import PropTypes from 'prop-types';


export default function RadialProgress({ value }) {
  let valueFormatted = parseInt(value, 10);
  if (Number.isNaN(valueFormatted)) {
    value = 0;
    valueFormatted = '-';
  }
  const radius = 28;
  const trackWidth = 2;
  const valueWidth = 3;

  const size = (radius * 2) + Math.max(valueWidth, trackWidth);
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const valueStyle = {
    strokeDashoffset: circumference * (1 - (value / 100)),
    strokeDasharray: circumference,
  };

  return (
    <div className="svg-widget radial-progress">
      <span className="value flex-center">{valueFormatted}</span>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="track" cx={center} cy={center} r={radius} strokeWidth={trackWidth} />
        <circle className="value" cx={center} cy={center} r={radius} strokeWidth={valueWidth} style={valueStyle} />
      </svg>
    </div>
  );
}


RadialProgress.propTypes = {
  value: PropTypes.string.isRequired,
};
