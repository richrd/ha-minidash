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
    const radius = 28;
    const trackWidth = 2;
    const valueWidth = 3;

    const size = (radius * 2) + Math.max(valueWidth, trackWidth);
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    return {
      size,
      center,
      radius,
      circumference,
      trackWidth,
      valueWidth,
    };
  },
  computed: {
    valueFormatted() {
      const valueFormatted = parseInt(this.value, 10);
      return Number.isNaN(valueFormatted) ? "-" : valueFormatted;
    },
    valueStyle() {
      return {
        strokeDashoffset: this.circumference * (1 - (this.value / 100)),
        strokeDasharray: this.circumference,
      };
    },
  },
  props: {
    value: [Number, String],
  },
};
</script>
