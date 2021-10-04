<template lang="pug">
div(:class='$style.container')

  div(:class='$style.caption')
    button(
      v-for="item in list"
      :key="item.id"
      :class='[$style.label, activeTab === item.id ? $style.active : ``]'
      @click="onChange(item)"
    ) {{ item.label }}

  div(:class='$style.content')
    slot
</template>

<script>
export default {
  props: {
    list: Object,
    activeTab: Number,
  },

  setup(props, { emit }) {
    const onChange = (item) => {
      emit('onChange', item);
    };

    return {
      onChange,
    };
  },
};
</script>

<style lang="scss" module src="@Scss/ui/Tabs.scss"></style>
