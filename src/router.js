import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Info from "./views/Info.vue";
import Settings from "./views/Settings.vue";
import Group from "./views/Group.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/info",
      name: "info",
      component: Info,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/group/:id",
      component: Group,
    },
  ],
});
