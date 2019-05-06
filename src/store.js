import Vue from "vue";
import Vuex from "vuex";

import { entityIsGroup, getEntitiesInGroup } from "@/utils/ha";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connectionStatus: "disconnected",
    authStatus: null,
    entities: [],
    config: {},
    navOpen: false,
    header: {
      icon: "",
      title: "",
    },
    settings: {
      // The domain and port of the HA instance
      apiUrl: "",
      // The password for the HA instance (optional)
      password: "",
      // Show room groups separately in the menu
      showRooms: true,
      // Show room groups separately in the menu
      defaultGroup: "",
      // Debug mode on by default
      debug: false,
    },
  },
  mutations: {
    // UI
    openNav(state) {
      state.navOpen = true;
    },
    closeNav(state) {
      state.navOpen = false;
    },
    toggleNav(state) {
      state.navOpen = !state.navOpen;
    },
    setHeader(state, data) {
      state.header = data;
    },
    setSettings(state, data) {
      state.settings = data;
    },

    // Connection
    setConnectionStatus(state, data) {
      state.connectionStatus = data;
    },
    setAuthStatus(state, data) {
      state.authStatus = data;
    },

    // HA Entities
    setEntities(state, data) {
      if (!Array.isArray(data)) {
        console.error("Trying to assign non-array to entities!");
        return;
      }
      state.entities = data;
    },
    updateEntity(state, data) {
      const entities = [
        ...state.entities.filter(item => item.entity_id !== data.entity_id),
        data,
      ];
      state.entities = entities;
    },

    // HA Config
    setConfig(state, data) {
      state.config = data;
    },
  },
  actions: {},
  getters: {
    getEntityById: state => id => state.entities.find(item => item.entity_id === id),
    getGroups: state => state.entities.filter(item => entityIsGroup(item)),
    getEntitiesInGroup: state => group => getEntitiesInGroup(state.entities, group),
  },
});
