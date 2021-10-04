<template lang="pug">
div(:class='[$style.container, isError ? $style.error : ``]')
  label(
    :class='$style.label'
    :for='label'
  ) {{ label }}

  input(
    v-if='type === "text" && !onlyRus',
    :class='$style.input',
    :id='label',
    :type='type',
    :placeholder='placeholder',
    :value='value'
    @focus='onFocus',
    @blur='onBlur',
    @input='onInput',
  )
  input(
    v-if='type === "text" && onlyRus',
    :class='$style.input',
    :id='label',
    :type='type',
    :placeholder='placeholder',
    :value='value'
    @focus='onFocus',
    @blur='onBlur',
    @input='onInput',
    @keypress="isLetter($event)"
  )
  input(
    v-if='type === "number"',
    :class='$style.input',
    :id='label',
    :type='type',
    :value='value',
    :placeholder='placeholder',
    @keypress='onlyNumber',
    @focus='onFocus',
    @blur='onBlur',
    @input='onInput'
  )
  input(
    v-if='type === "phone"',
    :class='$style.input',
    :id='label',
    :type='type',
    placeholder='+7 (___) ___-__-__',
    v-maska='\'+7 (###) ###-##-##\'',
    @focus='onFocus',
    @input='onInput'
  )
  textarea(
    v-if='type === "textarea"',
    :class='$style.textarea',
    :id='label',
    :type='type',
    :value='value',
    :placeholder='placeholder',
    @focus='onFocus',
    @blur='onBlur',
    @input='onInput'
  )
  div(v-if="isError" :class='$style.errorText') {{ errorText }}
</template>

<script>
import { computed } from 'vue';
export default {
  props: {
    label: String,
    value: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    errorText: String,
    isError: Boolean,
    onlyRus: Boolean,
  },
  setup(props, { emit }) {
    const onInput = (event) => {
      emit('onInput', event.target.value);
    };

    const isLetter = (e) => {
      const char = String.fromCharCode(e.keyCode);
      if (/^[А-ЯЁа-яё -]+$/.test(char)) return true;
      else e.preventDefault();
    };

    const onFocus = () => {
      emit('onFocus');
    };

    const onBlur = () => {
      emit('onBlur');
    };

    const onlyNumber = ($event) => {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    };

    return {
      onInput,
      onFocus,
      onBlur,
      onlyNumber,
      isLetter,
    };
  },
};
</script>

<style lang="scss" module src="@Scss/ui/Input.scss"></style>
