<template lang="pug">
h2(:class='$style.container') {{ text }}
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style lang="scss" module>
@import '@Scss/component.scss';

.container {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
}

@include desktop() {
  .container {
    font-size: 32px;
    line-height: 40px;
  }
}
</style>
