<template lang="pug">
div(:class='$style.container')
  slot
</template>

<style lang="scss" module>
.container {
  margin-bottom: 38px;
}
</style>
