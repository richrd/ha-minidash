<template>
  <div class="text-center d-flex fd-col h-100 jc-space-around info-view">
    <dl>
      <dt>HA Minidash Version</dt>
      <dd>{{ version }}</dd>
      <br />
    </dl>

    <Icon name="home-assistant" :size="144" />

    <dl>
      <dt>Home Assistant Version</dt>
      <dd>{{ config["version"] }}</dd>
      <br />
      <dt>Timezone</dt>
      <dd>{{ config["time_zone"] }}</dd>
      <br />
      <dt>Connection Status</dt>
      <dd>{{ connectionStatus }}</dd>
      <br />
    </dl>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon.vue";

const pkg = require("../../package.json");

export default {
  name: "info",
  components: {
    Icon,
  },
  mounted() {
    this.$store.commit("setHeader", {
      icon: "information-outline",
      title: "Info",
    });
  },
  data() {
    return {
      version: pkg.version,
    };
  },
  props: {
    icon: String,
    title: String,
  },
  computed: mapState(["config", "connectionStatus"]),
};
</script>
