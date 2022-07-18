import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    setIuser: (state, data) => {
      state.user = data;
    },
  },
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
});
