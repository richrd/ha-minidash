<template>
  <button
    :class="`h-100 status-${connectionStatus} ${className()}`"
    @click="resetConnection"
    title="Reconnect"
  >
    <Icon :name="iconName()" />
  </button>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon.vue";
import haApi from "../api/HaApi";

export default {
  name: "connection-indicator",
  components: {
    Icon,
  },
  methods: {
    iconName() {
      return this.connectionStatus === "connected" ? "signal" : "signal-off";
    },
    className() {
      return this.connectionStatus === "connecting" ? "pulse-opacity" : "";
    },
    resetConnection() {
      haApi.disconnect();
      haApi.connect();
    },
  },
  computed: {
    ...mapState(["config", "connectionStatus"]),
  },
};
</script>
