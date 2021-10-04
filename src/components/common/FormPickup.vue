<template lang="pug">
form
  FormContent
    div(:class='$style.list')
      AppRadio(
        v-for="item in cities"
        :key="item.id"
        :label="`Пункт Выдачи заказов ${item.name}`"
        :checked="item.id === currentCityID"
        name="city"
        @onChange="handleCity(item)"
      )
    div(:class='$style.map')
      #map
FormActions
    AppButton(
      text="Отправить"
      @click="sendForm"
    )
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import FormContent from '@Components/ui/FormContent';
import FormBlock from '@Components/ui/FormBlock';
import FormActions from '@Components/ui/FormActions';
import AppButton from '@Components/ui/Button';
import AppRadio from '@Components/ui/RadioButton';

export default {
  components: {
    FormBlock,
    FormContent,
    FormActions,
    AppButton,
    AppRadio,
  },
  props: {},
  setup() {
    const { state, commit } = useStore();

    const cities = computed(() => state.forms.cities);
    const currentCityID = computed(() => state.forms.currentCityID);
    const currentCityName = computed(() => state.forms.currentCityName);

    const handleCity = (item) => {
      commit('setCurrentCity', item);
    };

    const fetchMap = () => {
      async function init() {
        const myMap = new ymaps.Map(
            'map',
            {
              center: [55.760687, 37.608984],
              zoom: 10,
            },
            {
              searchControlProvider: 'yandex#search',
            }
          ),
          objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
          });
        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#greenDotIcon');
        objectManager.clusters.options.set(
          'preset',
          'islands#greenClusterIcons'
        );
        myMap.geoObjects.add(objectManager);
        await fetch('data/pickupPoint.json')
          .then((response) => response.json())
          .then((data) => {
            objectManager.add(data);
          });
      }
      ymaps.ready(init);
    };
    onMounted(() => {
      fetchMap();
    });

    const sendForm = (e) => {
      e.preventDefault();

      let isValid = true;

      if (!currentCityName.value) {
        isValid = false;
        alert('Выберите точку самовывоза!');
      }

      if (isValid) {
        alert(`Заказ отправлен в ${currentCityName.value}`);
      }
    };

    return {
      cities,
      currentCityID,
      sendForm,
      handleCity,
    };
  },
};
</script>

<style lang="scss" module>
@import '@Scss/component.scss';

.list {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.map {
  height: 300px;
  width: 100%;

  & > div > *:not(:last-child) {
    display: none;
  }

  & > * {
    width: 100%;
    height: 100%;
  }
}

@include desktop {
  .list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
