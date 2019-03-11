<template>
  <div class="svg-widget angle-gauge">
    <span class="value flex-center">{{ valueFormatted }}</span>
    <svg :width="size" :height="size" :view-box="`0 0 ${size} ${size}`">
      <circle class="track" :cx="center" :cy="center" :r="radius" :stroke-width="trackWidth" :style="trackStyle" />
      <line class="step" :x1="center" :y1="0" :x2="center" :y2="trackWidth" />
      <line class="step" :x1="size - trackWidth" :y1="center" :x2="size" :y2="center" />
      <line class="step" :x1="center" :y1="size - trackWidth" :x2="center" :y2="size" />
      <line class="step" :x1="0" :y1="center" :x2="trackWidth" :y2="center" />
      <line class="value" :x1="center" :y1="1" :x2="center" :y2="trackWidth-1" :style="lineStyle" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "angle-gauge",
  data() {
    const radius = 30;
    const trackWidth = 10;
    const size = (radius * 2) + trackWidth;
    const center = size / 2;
    const circumference = Math.PI * radius;

    return {
      size,
      center,
      radius,
      trackWidth,
      circumference,
    };
  },
  computed: {
    valueFormatted() {
      const valueFormatted = parseInt(this.value, 10);
      return Number.isNaN(valueFormatted) ? "-" : valueFormatted;
    },
    lineStyle() {
      return {
        transform: `rotate(${this.value}deg)`,
        transformOrigin: `${this.center}px ${this.center}px`,
      };
    },
    trackStyle() {
      const dashWidth = this.circumference * 0.025;
      const gapWidth = this.circumference * 0.075;

      return {
        strokeDashoffset: 1.2,
        strokeDasharray: `${dashWidth}, ${gapWidth}`,
      };
    },
  },
  props: {
    value: [Number, String],
  },
};
</script>
