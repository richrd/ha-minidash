<template>
  <div class="svg-widget radial-progress">
    <span class="value flex-center">{{ valueFormatted }}</span>
    <svg :width="size" :height="size" :view-box="`0 0 ${size} ${size}`">
      <circle class="track" :cx="center" :cy="center" :r="radius" :stroke-width="trackWidth" />
      <circle class="value" :cx="center" :cy="center" :r="radius" :stroke-width="valueWidth" :style="valueStyle" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "radial-progress",
  data() {
    let { value } = this;
    let valueFormatted = parseInt(value, 10);

    if (Number.isNaN(valueFormatted)) {
      value = 0;
      valueFormatted = "-";
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

    return {
      valueFormatted,
      size,
      center,
      radius,
      trackWidth,
      valueStyle,
      valueWidth,
    };
  },
  props: {
    value: [Number, String],
  },
};
</script>
