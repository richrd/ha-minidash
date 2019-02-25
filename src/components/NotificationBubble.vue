<template>
  <div :class="className">
    <div v-if="!$store.state.settings.apiUrl" class="message-bubble">
      Connection settings missing, please go to settings to add them.
    </div>
    <div v-else class="message-bubble">
      {{ statusMessage }}
    </div>
  </div>
</template>

<style lang="sass">
.message-bubbles
  position: absolute
  left: 0
  right: 0
  bottom: $sizer*4
  margin: 0 $sizer
  text-align: center
  z-index: 1000
  pointer-events: none
  opacity: 0
  transition: opacity 1s ease-in-out
  display: flex
  flex-direction: column

.message-bubbles.show
  opacity: 1
  transition: opacity 1s ease-in-out

.message-bubble
  pointer-events: all
  display: inline-block
  margin: $sizer/2 auto
  padding: $sizer $sizer*2
  min-width: 150px
  border-radius: $sizer
  text-align: center
  background: $color-bubble-background
  color: $color-bubble-foreground
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "notification-bubble",
  data() {
    return {
      messages: {
        connecting: "Connecting...",
        disconnected: "Disconnected",
        connected: "Connected",
      },
    };
  },
  computed: {
    statusMessage() {
      let msg = this.messages[this.connectionStatus];
      if (this.connectionStatus === "disconnected" && this.authStatus === "auth_invalid") {
        msg += ": Authentication failed!";
      }
      return msg;
    },
    className() {
      let className = "message-bubbles";
      if (["connecting", "disconnected"].includes(this.connectionStatus)) {
        className += " show";
      }
      return className;
    },
    ...mapState(["config", "connectionStatus", "authStatus"]),
  },
};
</script>
