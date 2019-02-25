<template>
  <div class="settings px-1 py-1">
    <form @submit.prevent="save">
      <h2>Home Assistant</h2>
      <div class="form-item">
        <label for="apiUrl">API URL</label>
        <input id="apiUrl" type="text" placeholder="http://hassbian:8123" v-model="editableSettings.apiUrl"/>
      </div>
      <div class="form-item">
        <label for="password">API Password</label>
        <input id="password" type="password" v-model="editableSettings.password"/>
      </div>
      <br>
      <h2>User Interface</h2>
      <div class="form-item checkbox">
        <div class="input">
          <input id="showRooms" type="checkbox" v-model="editableSettings.showRooms"/>
        </div>
        <label for="showRooms">
          Show rooms in navigation
        </label>
      </div>
      <br>
      <h2>Other</h2>
      <div class="form-item checkbox">
        <div class="input">
          <input id="debug" type="checkbox" v-model="editableSettings.debug"/>
        </div>
        <label for="debug">
          Debug Mode
        </label>
      </div>
      <br/>
      <div class="form-item">
        <label>
        </label>
        <button class="btn">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="sass">
.settings
  .form-item
    color: $color-dim-text
    width: 100%

    margin-bottom: $sizer*2
    input:not([type=checkbox])
      width: 100%
      max-width: 500px
    label
      display: block
      width: 100%
      text-align: center
  .form-item.checkbox
    label, .input
      width: auto
      display: inline-block

  button
    width: 100%

  h2
    text-transform: uppercase
    font-size: 12px
    font-size: .75em
    font-weight: 400
    text-align: center
    padding-bottom: $sizer
    margin-top: $sizer*2

@media screen and (min-width: 500px)
  .settings
    h2
      text-align: left
    .form-item,
      width: 100%
      display: flex
      align-items: center
      label
        flex-shrink: 0
        width: 150px
        text-align: right
        padding-right: $sizer
    .form-item.checkbox
      .input
        flex-shrink: 0
        width: 150px
        text-align: right
        padding-right: $sizer
    button
      width: auto
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "info",
  data() {
    return {
      editableSettings: { ...this.$store.state.settings },
    };
  },
  watch: {
    settings(settings) {
      this.settingsChanged(settings);
    },
  },
  mounted() {
    this.$store.commit("setHeader", {
      icon: "settings",
      title: "Settings",
    });
  },
  methods: {
    save() {
      this.$store.commit("setSettings", this.editableSettings);
      this.$root.$emit("settingsChanged");
    },
    settingsChanged(settings) {
      this.editableSettings = { ...settings };
    },
  },
  props: {
    icon: String,
    title: String,
  },
  computed: mapState(["settings"]),
};
</script>
