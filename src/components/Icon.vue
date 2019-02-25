<template>
  <i :class="`mdi mdi-${name} mdi-${size}px`" />
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
    size: {
      default: 24,
      type: Number,
    },
  },
};
</script>
