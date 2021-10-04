<template lang="pug">
label(:class='$style.container')
  input(
    :class='$style.input',
    type='radio',
    :name='name'
    :checked='checked',
    @change='onChange'
  )
  div(:class='$style.radio')
  div(:class='$style.text') {{ label }}
</template>

<script>
export default {
  props: {
    label: String,
    name: String,
    checked: Boolean,
  },

  setup(props, { emit }) {
    const onChange = () => {
      emit('onChange', props.label);
    };

    return {
      onChange,
    };
  },
};
</script>

<style lang="scss" module src="@Scss/ui/RadioButton.scss"></style>
