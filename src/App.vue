<template>
  <div
    id="app"
    :class="{ 'navigation-open': navOpen }"
    @keydown.escape="closeNav"
    @keyup.77="openNav"
  >
      <SwipeContainer :on-swipe="onSwipe">
        <HeaderBar title="Yolo" icon="flash" />
        <main id="component-container">
          <router-view />
        </main>
        <NotificationBubble />
      </SwipeContainer>
  </div>
</template>

<style lang="sass">
@import './assets/styles/global.sass'
@import './assets/styles/helpers.sass'
@import './assets/styles/widgets.sass'
@import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

// Basics for our dom wrappers
body, html
  margin: 0
  padding: 0
  color: $color-foreground
  background-color: $color-background

  font-family: "Open Sans", sans-serif
  font-size: 16px
  height: 100%

#app
  height: 100%
  max-width: 100%
  overflow: hidden
  font-family: sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

#component-container
  position: absolute
  top: $header-bar-height
  left: 0
  right: 0
  bottom: 0
  overflow-y: auto
  overflow-x: hidden
</style>

<script type="text/javascript">
import SwipeContainer from "@/components/SwipeContainer.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import NotificationBubble from "@/components/NotificationBubble.vue";

export default {
  name: "app",
  components: {
    SwipeContainer,
    HeaderBar,
    NotificationBubble,
  },
  methods: {
    openNav() {
      this.$store.commit("openNav");
    },
    closeNav() {
      this.$store.commit("closeNav");
    },
    onSwipe(angle, distance) {
      if (distance < 50) {
        // Swipe too short
        return;
      }

      /*
      angle:

            -90
        -135   -45
        180       0
         135    45
             90
      */
      const absAngle = Math.abs(angle);
      if (absAngle < 45) {
        this.$store.commit("openNav");
      } else if (absAngle > 135) {
        this.$store.commit("closeNav");
      }
    },
  },
  computed: {
    entities() {
      return this.$store.state.entities;
    },
    navOpen() {
      return this.$store.state.navOpen;
    },
  },
};
</script>
