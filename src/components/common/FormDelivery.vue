<template lang="pug">
form
  FormContent
    FormBlock
      div(:class="$style.formDouble")
        AppInput(
          label="ФИО"
          placeholder="Только кириллица"
          errorText="Введите ФИО"
          :isError="isFioError"
          :value="fio"
          onlyRus
          @onFocus="onFocusFio"
          @onInput='handleFIO'
        )
        AppInput(
          label="Телефон"
          type="phone"
          errorText="Введите телефон"
          :isError="isPhoneError"
          :value="phone"
          @onFocus="onFocusPhone"
          @onInput='handlePhone'
        )
    FormBlock
      AppInput(
        label="Адрес доставки"
        placeholder="Город, улица, дом"
        errorText="Введите адрес"
        :isError="isAddressError"
        :value="address"
        @onFocus="onFocusAddress"
        @onInput="handleAddress"
      )
    FormBlock
      AppInput(
        label="Комментарий"
        type="textarea"
      )

  FormActions
    AppButton(
      text="Отправить"
      @click="sendForm"
    )
</template>

<script>
import { ref } from 'vue';

import FormContent from '@Components/ui/FormContent';
import FormBlock from '@Components/ui/FormBlock';
import FormActions from '@Components/ui/FormActions';
import AppInput from '@Components/ui/Input';
import AppButton from '@Components/ui/Button';

export default {
  components: {
    FormBlock,
    AppInput,
    FormContent,
    FormActions,
    AppButton,
  },
  props: {},
  setup() {
    const address = ref(null);
    const isAddressError = ref(false);
    const phone = ref(null);
    const isPhoneError = ref(false);
    const fio = ref(null);
    const isFioError = ref(false);

    const handleFIO = (value) => {
      fio.value = value;
    };

    const handleAddress = (value) => {
      address.value = value;
    };

    const handlePhone = (value) => {
      phone.value = value;
    };

    const onFocusFio = () => {
      isFioError.value = false;
    };

    const onFocusAddress = () => {
      isAddressError.value = false;
    };

    const onFocusPhone = () => {
      isPhoneError.value = false;
    };

    const sendForm = (e) => {
      e.preventDefault();

      let isValid = true;

      if (!fio.value) {
        isFioError.value = true;
        isValid = false;
      }

      if (!address.value) {
        isAddressError.value = true;
        isValid = false;
      }

      if (phone.value === null || phone.value?.length < 17) {
        isPhoneError.value = true;
        isValid = false;
      }

      if (isValid) {
        alert('Отправлено!');
      }
    };

    return {
      fio,
      address,
      phone,
      isAddressError,
      isPhoneError,
      isFioError,
      handleFIO,
      handleAddress,
      handlePhone,
      onFocusFio,
      onFocusAddress,
      onFocusPhone,
      sendForm,
    };
  },
};
</script>

<style lang="scss" module>
@import '@Scss/component.scss';

@include _desktop {
  .formDouble {
    & > *:first-child {
      margin-bottom: 35px;
    }
  }
}

@include desktop {
  .formDouble {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > * {
      width: calc(100% / 2 - 16px);
    }
  }
}
</style>
