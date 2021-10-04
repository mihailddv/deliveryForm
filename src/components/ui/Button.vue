<template lang="pug">
button(
  :class='[$style.container, styled ? $style[styled] : ``]',
  v-on='$listeners'
  :disabled="disabled"
)
  div(:class='$style.text') {{ text }}
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    text: String,
    styled: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const styled = computed(() => props.styled);

    return {
      styled,
    };
  },
};
</script>

<style lang="scss" module src="@Scss/ui/Button.scss"></style>
