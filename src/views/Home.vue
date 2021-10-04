<template lang="pug">
div(:class='$style.container')
  div(:class='$style.caption')
    Title(text="Выберите способ доставки")

  div(:class='$style.content')
    AppTabs(
      :list="tabsList"
      :activeTab="activeTab"
      @onChange="handleChangeTab"
    )
      FormDelivery(
        v-if="activeTab === 1" 
      )
      FormPickup(
        v-if="activeTab === 2" 
      )
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import Title from '@Components/common/Title';
import AppTabs from '@Components/ui/Tabs';
import FormDelivery from '@Components/common/FormDelivery';
import FormPickup from '@Components/common/FormPickup';

export default {
  components: {
    AppTabs,
    Title,
    FormDelivery,
    FormPickup,
  },
  setup() {
    const { state, commit } = useStore();

    const activeTab = computed(() => state.forms.activeTab);
    const tabsList = computed(() => state.forms.tabsList);

    const handleChangeTab = (value) => {
      commit('setActiveTab', value.id);
    };

    return {
      activeTab,
      tabsList,
      handleChangeTab,
    };
  },
};
</script>

<style lang="scss" module src="@Scss/components/Home.scss"></style>
