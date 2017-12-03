import React from 'react';
import PropTypes from 'prop-types';


export default function AngleGauge({ value }) {
  let valueFormatted = parseInt(value, 10);
  if (Number.isNaN(valueFormatted)) {
    value = 0;
    valueFormatted = '-';
  }

  const radius = 30;
  const trackWidth = 10;
  const size = (radius * 2) + trackWidth;
  const center = size / 2;
  const circumference = Math.PI * radius;

  const gapWidth = circumference * 0.075;
  const dashWidth = circumference * 0.025;

  const trackStyle = {
    strokeDashoffset: 1.2,
    strokeDasharray: `${dashWidth}, ${gapWidth}`,
  };

  const lineStyle = {
    transform: `rotate(${value}deg)`,
    transformOrigin: `${center}px ${center}px`,
  };


  return (
    <div className="svg-widget angle-gauge">
      <span className="value flex-center">{valueFormatted}</span>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="track" cx={center} cy={center} r={radius} strokeWidth={trackWidth} style={trackStyle} />
        <line className="step" x1={center} y1={0} x2={center} y2={trackWidth} />
        <line className="step" x1={size - trackWidth} y1={center} x2={size} y2={center} />
        <line className="step" x1={center} y1={size - trackWidth} x2={center} y2={size} />
        <line className="step" x1={0} y1={center} x2={trackWidth} y2={center} />

        <line className="value" x1={center} y1={1} x2={center} y2={trackWidth-1} style={lineStyle} />
      </svg>
    </div>
  );
}


AngleGauge.propTypes = {
  value: PropTypes.string.isRequired,
};
