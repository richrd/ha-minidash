<template>
  <header>
    <div id="header-bar" class="header-bar d-flex jc-space-between">
      <button class="btn-plain h-100 pr-3" alt="Menu" @click="toggleNav">
        <Icon name="menu" />
      </button>

      <div class="header-label d-flex">
        <div v-if="icon" class="mr-1"><Icon :name="header['icon']" /></div>
        <span>{{ header["title"] }}</span>
      </div>

      <ConnectionIndicator />
    </div>
    <Navigation />
  </header>
</template>

<style lang="sass">
#root
  padding-top: $header-bar-height

#header-bar
  position: fixed
  top: 0
  left: 0
  right: 0
  height: $header-bar-height
  background: $color-panel-background

  display: flex
  flex-direction: row
  align-items: center
  padding: 0 $sizer-x

  border-bottom: 1px solid $color-panel-border
</style>

<script>
import { mapMutations, mapState } from "vuex";
import Icon from "@/components/Icon.vue";
import Navigation from "@/components/Navigation.vue";
import ConnectionIndicator from "@/components/ConnectionIndicator.vue";

export default {
  name: "header-bar",
  components: {
    Icon,
    Navigation,
    ConnectionIndicator,
  },
  props: {
    icon: String,
    title: String,
  },
  methods: {
    ...mapMutations(["toggleNav"]),
  },
  computed: {
    ...mapState(["header"]),
  },
};
</script>
