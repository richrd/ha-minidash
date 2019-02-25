<template>
  <div
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "swipe-container",
  mounted() {
    this.touchStartPoint = null;
    this.touchEndPoint = null;
  },
  methods: {
    onTouchStart(e) {
      this.touchStartPoint = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        timestamp: new Date(),
      };
    },
    onTouchMove(e) {
      this.touchEndPoint = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        timestamp: new Date(),
      };
    },
    onTouchEnd() {
      const start = this.touchStartPoint;
      const end = this.touchEndPoint;

      if (start === null || end === null) {
        return;
      }

      const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;
      const distance = Math.sqrt(((start.x - end.x) ** 2) + ((start.y - end.y) ** 2));
      const duration = (new Date()) - start.timestamp;

      this.onSwipeComplete(angle, distance, duration, start, end);

      this.touchStartPoint = null;
      this.touchEndPoint = null;
    },
    onSwipeComplete(angle, distance, duration, start, end) {
      if (this.onSwipe) {
        this.onSwipe(angle, distance, duration, start, end);
      }
    },
  },
  props: {
    onSwipe: Function,
  },
};
</script>
