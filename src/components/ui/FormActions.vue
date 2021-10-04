<template lang="pug">
div(:class='$style.container')
  slot
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
