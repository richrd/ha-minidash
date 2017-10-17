import React from 'react';
import PropTypes from 'prop-types';


export default function RadialProgress({ value }) {
  const valueFormatted = parseInt(value, 10);
  const radius = 28;
  const trackWidth = 1;
  const valueWidth = 3;

  const size = (radius * 2) + Math.max(valueWidth, trackWidth);
  const center = size / 2;
  const cicumference = 2 * Math.PI * radius;

  const valueStyle = {
    strokeDashoffset: cicumference * (1 - (value / 100)),
    strokeDasharray: cicumference,
  };

  return (
    <div className="progress-circle">
      <span className="value flex-center">{valueFormatted}</span>
      <svg className="progress-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="track" cx={center} cy={center} r={radius} strokeWidth={trackWidth} />
        <circle className="value" cx={center} cy={center} r={radius} strokeWidth={valueWidth} style={valueStyle} />
      </svg>
    </div>
  );
}


RadialProgress.propTypes = {
  value: PropTypes.string.isRequired,
};
