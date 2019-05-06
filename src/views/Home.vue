<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
import router from "../router";

export default {
  name: "home",
  mounted() {
    this.$root.$on("settingsLoaded", () => {
      if (this.settings.defaultGroup) {
        router.push(`group/${this.settings.defaultGroup}`);
      }
    });
  },
  computed: {
    ...mapState(["settings"]),
  },
};
</script>
