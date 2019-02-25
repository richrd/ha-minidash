<template>
    <div
      class="entity-tile"
      :title="entity.attributes.friendly_name"
      :data-state="entity.state"
      :data-type="type"
      :data-entity-id="entity.entity_id"
      :data-short-value="isShortValue"
      @click="entityClicked"
      @keypress.enter="entityClicked"
      role="button"
      tabIndex="0"
    >
      <div class="tile-label">{{ entity.attributes.friendly_name }}</div>

        <!-- wundergroundIcon ? "<i class={"wu wu-white wu-64 wu-${wundergroundIcon}"} />" : null -->

        <div v-if="type === 'sensor'" class="tile-content">
          <div class="tile-state">

            <RadialProgress
              v-if="unit=='%'"
              :value="entity.state" />
            <AngleGauge
              v-else-if="unit === '°'"
              :value="entity.state" />
            <div v-else>
              <div class="tile-value">{{ entity.state }}</div>
              <div class="tile-unit">{{ unit }}</div>
            </div>

          </div>
        </div>

        <!-- TODO: implement
        // <div v-if="type === 'input_number'" class="tile-content">
        //   <EntityInputNumber entity={entity} />
        // </div>

        // <div v-if="type === 'input_text'" class="tile-content">
        //   <EntityInputText entity={entity} />
        // </div>
        -->

        <div class="tile-icon" v-if="showIcon">
          <Icon :name="icon" />
        </div>
    </div>
</template>

<script>
import Icon from "./Icon.vue";
import AngleGauge from "./widgets/AngleGauge.vue";
import RadialProgress from "./widgets/RadialProgress.vue";
import { entityIsToggleable, entityIsScript, getEntityIconWithState } from "../utils/ha";
import haApi from "../api/HaApi";

export default {
  name: "entity-tile",
  components: {
    Icon,
    RadialProgress,
    AngleGauge,
  },
  data() {
    const iconlessDomains = ["sensor", "input_text", "input_number"];
    const [type] = this.entity.entity_id.split(".");
    const showIcon = !iconlessDomains.includes(type);
    const icon = getEntityIconWithState(this.entity);
    const entityAttrs = this.entity.attributes;
    const unit = (entityAttrs && entityAttrs.unit_of_measurement) ? entityAttrs.unit_of_measurement : "";
    const valLength = `${this.entity.state}`.length;
    const isShortValue = valLength < 6;

    return {
      type,
      showIcon,
      unit,
      isShortValue,
      icon,
    };
  },
  methods: {
    entityClicked() {
      // Toggle
      if (entityIsToggleable(this.entity)) {
        haApi.toggleEntity(this.entity);
      }

      // Run script
      if (entityIsScript(this.entity)) {
        haApi.runScript(this.entity);
      }
    },
  },
  props: {
    entity: Object,
  },
};
</script>
