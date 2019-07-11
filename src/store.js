import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './store/products';
import cartModules from './store/cart';
import alertMessageModules from './store/alertMessage';
import favoriteModules from './store/favorite';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 嚴謹模式
  state: {
    isLoading: false,
    pagination: {},
  },
  actions: {
    // isLoading
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    // isLoading
    LOADING(state, status) {
      state.isLoading = status;
    },
    // pagination
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    pagination: state => state.pagination,
  },
  modules: {
    productsModules,
    cartModules,
    alertMessageModules,
    favoriteModules,
  },
});
