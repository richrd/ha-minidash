<template>
  <div :class="`status-${connectionStatus} ${className()}`">
    <Icon :name="iconName()" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon.vue";

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
  },
  computed: {
    ...mapState(["config", "connectionStatus"]),
  },
};
</script>
