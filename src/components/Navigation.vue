<template>
  <div id="navigation">
    <nav class="nav-menu">

      <div class="nav-top d-flex fd-row px-2 jc-space-between">
        <h1><Icon name="home-assistant" /><span class="ml-1">{{ config.location_name }}</span></h1>
        <button class="btn-plain h-100 pl-3" @click="toggleNavigation">
          <Icon name="close" />
        </button>
      </div>

      <div class="nav-content">
        <ul class="nav-items">

          <li class="header" v-if="navGroups.length">
            <h2>Groups</h2>
          </li>
          <li v-for="entity in navGroups" :key="entity.entity_id">
            <router-link
              @click.native="toggleNavigation"
              :to="'/group/' + entity.entity_id.split('.')[1]">
              <Icon :name="getEntityIcon(entity)" />
              <span>
                {{ entity.attributes.friendly_name }}
              </span>
            </router-link>
          </li>

          <li class="header" v-if="navRooms.length">
            <h2>Rooms</h2>
          </li>
          <li v-for="entity in navRooms" :key="entity.entity_id">
            <router-link
              @click.native="toggleNavigation"
              :to="'/group/' + entity.entity_id.split('.')[1]">
              <Icon :name="getEntityIcon(entity)" />
              <span>
                {{ entity.attributes.friendly_name }}
              </span>
            </router-link>
          </li>

          <li class="header">
            <h2>Tools</h2>
          </li>
          <li>
            <button @click="() => { toggleNavigation(); haApi.reloadCoreConfig(); }">
              <Icon name="settings" /><span>Reload Core</span>
            </button>
          </li>
          <li>
            <button @click="() => { toggleNavigation(); haApi.reloadGroupConfig(); }">
              <Icon name="view-list" /><span>Reload Groups</span>
            </button>
          </li>
          <li>
            <button @click="() => { toggleNavigation(); haApi.reloadAutomationConfig(); }">
              <Icon name="playlist-play" /><span>Reload Automation</span>
            </button>
          </li>
          <li>
            <button @click="() => { toggleNavigation(); haApi.restartHomeAssistant(); }">
              <Icon name="restart" /><span>Restart HA</span>
            </button>
          </li>

          <li>
            <router-link to="/settings" @click.native="toggleNavigation">
              <Icon name="settings" /><span>Settings</span>
            </router-link>
          </li>
          <li>
            <router-link to="/info" @click.native="toggleNavigation">
              <Icon name="information-outline" /><span>Info</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="nav-backdrop"
      @click="toggleNavigation"
      role="button"
      tabIndex="0"
    />
  </div>
</template>

<style lang="sass">
//@import '../assets/styles/components/navigation.sass';
#navigation
  .nav-menu
    border-right: 1px solid $color-panel-border
    width: $nav-width
    position: absolute
    top: 0
    bottom: 0
    left: #{$nav-width * -1}
    background-color: $color-panel-background
    overflow: hidden
    display: flex
    flex-direction: column
    z-index: 11

    transform: translate(0, 0)
    transition: transform .2s ease-in-out

    .nav-top
      flex-shrink: 0
      height: $header-bar-height
      background-color: $color-background

      h1
        font-size: 18px
        font-weight: inherit
        margin: 0
        padding: 0

    .nav-content
      flex-grow: 1
      overflow-y: auto

    .nav-items
      list-style: none
      padding: 0
      margin: 0
      display: flex
      flex-direction: column

      li
        display: block

        &.header
          padding: $sizer $sizer
          color: $color-dim-text
          background-color: $color-nav-subheading-background

          h2
            font-size: .75em
            text-transform: uppercase
            text-align: center
            font-weight: inherit
            margin: 0
            padding: 0

        a, button
          display: flex
          align-items: center
          justify-content: left
          width: 100%
          padding: $sizer*2 $sizer*2
          background: transparent
          color: inherit
          font-size: inherit
          border-bottom: 1px solid $color-panel-border
          border-radius: 0
          outline: 0
          text-align:

          &:focus, &:hover
            color: lighten($color-foreground, 20)
            //border-left: 4px solid lighten($color-foreground, 10)
            box-shadow: inset 4px 0 0 lighten($color-foreground, 10)

          &.router-link-active
            color: $color-highlight-text
            //border-left: 4px solid $color-highlight-text
            box-shadow: inset 4px 0 0 $color-highlight-text

          .mdi
            margin-right: $sizer


        .icon
          margin-right: $sizer/2


  .nav-backdrop
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    background-color: $color-backdrop
    z-index: 10
    pointer-events: none
    opacity: 0
    transition: opacity .2s ease-in-out

.navigation-open #navigation
  .nav-menu
    transform: translate(#{$nav-width * 1}, 0)
    transition: transform .2s

  .nav-backdrop
    pointer-events: all
    opacity: .7
    transition: opacity .2s ease-in-out
    transition-delay: 0s
</style>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "@/components/Icon.vue";
import {
  getEntityIcon,
  entityIsHidden,
  entityIsRoom,
} from "@/utils/ha";
import haApi from "@/api/HaApi";

const sortEntities = (a, b) => {
  if (a.entity_id < b.entity_id) { return -1; }
  if (a.entity_id > b.entity_id) { return 1; }
  return 0;
};

export default {
  name: "navigation",
  components: {
    Icon,
  },
  mounted() {
    this.haApi = haApi;
  },
  computed: {
    navGroups() {
      return this.getGroups.filter((entity) => {
        if (this.settings.showRooms) {
          return !entityIsHidden(entity) && !entityIsRoom(entity);
        }
        return !entityIsHidden(entity);
      }).sort(sortEntities);
    },
    navRooms() {
      if (!this.settings.showRooms) {
        return [];
      }
      return this.getGroups.filter(entity => entityIsRoom(entity)).sort(sortEntities);
    },
    ...mapGetters(["getGroups"]),
    ...mapState(["config", "settings"]),
  },
  methods: {
    getEntityIcon,
    toggleNavigation() {
      this.$store.commit("toggleNav");
    },
  },
};
</script>
