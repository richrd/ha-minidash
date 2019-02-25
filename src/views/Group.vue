<template>
  <div class="group-view">
    <EntityTiles :entities="entities" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EntityTiles from "@/components/EntityTiles.vue";
import { getEntityIcon } from "@/utils/ha";

export default {
  name: "group",
  components: {
    EntityTiles,
  },
  mounted() {
    this.setHeader();
  },
  beforeUpdate() {
    this.setHeader();
  },
  methods: {
    setHeader() {
      const group = this.getEntityById(`group.${this.$route.params.id}`);
      if (!group) {
        return;
      }
      this.$store.commit("setHeader", {
        icon: getEntityIcon(group),
        title: group.attributes.friendly_name,
      });
    },
  },
  props: {
    icon: String,
    title: String,
  },
  computed: {
    entities() {
      return this.$store.getters.getEntitiesInGroup(this.$route.params.id);
    },
    ...mapGetters(["getEntitiesInGroup", "getEntityById"]),
  },
};
</script>
