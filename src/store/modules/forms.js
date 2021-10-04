const state = {
  activeTab: 1,
  tabsList: [
    {
      id: 1,
      label: 'Доставка',
    },
    {
      id: 2,
      label: 'Самовывоз',
    },
  ],
  cities: [
    {
      id: 1,
      name: 'Песчаная улица, дом 13',
    },
    {
      id: 2,
      name: 'Подсосенский переулок 11',
    },
  ],
  currentCityID: null,
  currentCityName: null,
};

const getters = {};

const mutations = {
  setActiveTab(store, payload) {
    store.activeTab = +payload;
  },
  setCurrentCity(store, payload) {
    store.currentCityID = payload.id;
    store.currentCityName = payload.name;
  },
  setIsMapLoaded(store, payload) {
    console.log('1');
    store.isMapLoaded = true;
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
