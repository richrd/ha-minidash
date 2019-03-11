import Vue from "vue";
import { mapState } from "vuex";
import App from "./App.vue";
import router from "./router";
import haApi from "@/api/HaApi";
import store from "./store";
import settings from "./settings";

Vue.config.productionTip = false;

new Vue({
  router,

  mounted() {
    this.ha = haApi;
    settings.setDefaults(this.$store.state.settings);
    settings.load();
    this.$store.commit("setSettings", settings.getSettings());

    if (this.settings.apiUrl) {
      this.setupConnection();
      this.ha.connect();
    }

    this.$root.$on("settingsChanged", () => this.settingsChanged());
  },
  methods: {
    setupConnection() {
      this.ha.init(
        this.settings.apiUrl,
        this.settings.password,
        this.settings.debug,
      );

      this.ha.onEvent((type, data) => {
        if (type === "connection_status") {
          this.$store.commit("setConnectionStatus", data);
        } else if (type === "auth_ok") {
          this.$store.commit("setAuthStatus", "auth_ok");
          this.ha.makeRequest("get_states");
          this.ha.makeRequest("get_config");
        } else if (type === "auth_invalid") {
          this.ha.disconnect();
          this.$store.commit("setAuthStatus", "auth_invalid");
        } else if (type === "event") {
          this.handleHaEvent(data);
        }
      });

      this.ha.onResult((type, data) => {
        if (type === "get_states") {
          this.$store.commit("setEntities", data);
        }
        if (type === "get_config") {
          this.$store.commit("setConfig", data);
        }
      });
    },
    handleHaEvent(data) {
      if (data.event.event_type === "state_changed") {
        this.$store.commit("updateEntity", data.event.data.new_state);
      }
    },
    settingsChanged() {
      settings.setSettings(this.settings);
      settings.save();

      this.ha.setDebug(this.settings.debug);
      if (this.settings.apiUrl !== this.ha.apiUrl || this.settings.password !== this.ha.password) {
        this.ha.disconnect();
        this.setupConnection();
        if (this.settings.apiUrl) {
          this.ha.connect();
        }
      }
    },
  },
  computed: mapState(["settings"]),
  store,
  render: h => h(App),
}).$mount("#app");
