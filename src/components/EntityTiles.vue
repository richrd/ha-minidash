<template>
  <div class="entity-tiles layout-grid">
    <EntityTile v-for="entity in entities" :key="entity.entity_id" :entity="entity"/>
  </div>
</template>

<style lang="sass">
/*
 * Default Tile Styles
 */
.entity-tiles
  .entity-tile
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
    background-color: $color-tile-background

    padding: .4em /* TODO: use sizer */

    text-align: center
    cursor: pointer

    display: flex
    flex-grow: 1
    flex-direction: column
    align-items: center
    justify-content: center

    .tile-label
      font-size: .8rem
      max-width: 100%
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      color: $color-dim-text

    .tile-content
      color: $color-tile-highlight-text
      overflow-y: hidden
      display: flex
      align-items: center
      justify-content: center
      flex-grow: 10
      flex-direction: column
      width: 100%

      .tile-value,
      .tile-unit
          display: inline-block
          vertical-align: middle

      .tile-value
          font-size: 1em

      .tile-unit
          vertical-align: top


    .tile-icon
      display: inline-block
      font-size: 3rem
      color: $color-tile-dim-icon
      display: flex
      align-items: center
      flex-grow: 7
      .mdi:before
        font-size: inherit

    &[data-short-value='true']
      .tile-value
        font-size: 1.75em

    &[data-state='on'] .tile-icon,
    &[data-state='home'] .tile-icon
      color: $color-tile-highlight-icon

    &[data-type='input_number']
      .tile-content
        width: 100%
      .slider
        height: 2rem
        padding: 0 $sizer * 2
        margin: $sizer/2 0
        .min, .max
          color: $color-tile-foreground


/*
 * Flexbox Tile Layout
 *
 * Works, but stumbles when an entity needs a height of two rows and
 * when the last row contains less items than than the previous row.
 */
.entity-tiles.layout-flex
  margin: 0 auto
  display: flex
  flex-wrap: wrap
  align-content: flex-start
  justify-content: space-around
  padding: $tile-grid-gap/2

  .entity-tile
    margin: $tile-grid-gap/2
    vertical-align: top
    width: $tile-width
    height: $tile-height

    &[data-type='input_number'],
    &[data-type='input_text']
      width: calc(#{$tile-width} * 2 + #{$tile-grid-gap})

    &[data-type='input_text']
      height: calc(#{$tile-height} * 2 + #{$tile-grid-gap})


/*
 * CSS Grid Tile Layout
 *
 * Does the same as the flex layout, but packs different sized entities
 * more efficiently and looks slightly better.
 */

.entity-tiles.layout-grid
  display: grid
  grid-gap: $tile-grid-gap
  margin: $tile-grid-gap

  height: auto

  // 2 Columns by default
  grid-template-columns: repeat(auto-fill, calc( 50% - (#{$tile-grid-gap} * .5) ))
  grid-template-rows: repeat(auto-fill, $tile-height)
  grid-auto-flow: row dense

  align-content: space-between;
  justify-content: space-around;

  .entity-tile
    width: 100%
    min-height: $tile-height
    max-width: 100%

    &.w-2
      grid-column: span 2

    &.h-2
      grid-row: span 2
      min-height: calc(#{$tile-height} * 2 + #{$tile-grid-gap})

    &.w-3
      grid-column: span 3

    &.h-3
      grid-row: span 3
      min-height: calc(#{$tile-height} * 3 + #{$tile-grid-gap} * 2)


    &[data-type='input_number']
      grid-column: span 2

    &[data-type='input_text'],
    &[data-entity-id^='sensor.pws_weather_']
      grid-column: span 2
      grid-row: span 2
      min-height: calc(#{$tile-height} * 2 + #{$tile-grid-gap})

// Responsive columns for grid layout

// 3 Cols
@media (min-width: 320px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 33.33% - (#{$tile-grid-gap} * .67) ))

// 4 Cols
@media (min-width: 450px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 25% - (#{$tile-grid-gap} * .75) ))

// 5 Cols
@media (min-width: 575px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 20% - (#{$tile-grid-gap} * .80) ))

// 6 Cols
@media (min-width: 675px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 16.66% - (#{$tile-grid-gap} * .8334) ))

// 7 Cols
@media (min-width: 775px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 14.28% - (#{$tile-grid-gap} * .8572) ))

// 8 Cols
@media (min-width: 900px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 12.5% - (#{$tile-grid-gap} * .875) ))

// 9 Cols
@media (min-width: 975px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 11.11% - (#{$tile-grid-gap} * .8888) ))

// 10 Cols
@media (min-width: 1100px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 10% - (#{$tile-grid-gap} * .9) ))

// 11 Cols
@media (min-width: 1200px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 9.09% - (#{$tile-grid-gap} * .909) ))

// 12 Cols
@media (min-width: 1350px)
  .entity-tiles.layout-grid
    grid-template-columns: repeat(auto-fill, calc( 8.33% - (#{$tile-grid-gap} * .916) ))

</style>

<script>
import EntityTile from "@/components/EntityTile.vue";

export default {
  name: "entity-tiles",
  components: {
    EntityTile,
  },
  props: {
    entities: Array,
  },
};
</script>
