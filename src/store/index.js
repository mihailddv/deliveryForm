import { createStore } from 'vuex';

import forms from './modules/forms';

const store = createStore({
  modules: {
    forms,
  },
});

export default store;
