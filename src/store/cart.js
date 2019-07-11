import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    carts: {},
    cartsLength: 0,
    isCartShow: false,
  },
  actions: {
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        context.commit('CART', response.data.data);
        context.commit('CART_LENGTH', response.data.data.carts.length);
      });
    },
    addToCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: cart }).then((response) => {
        context.dispatch('getCart');
        if (response.data.success) {
          context.dispatch('showCart');
          context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' }, { root: true });
        } else {
          context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
        }
        context.commit('LOADING', false, { root: true });
      });
    },
    removeCartItem(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((response) => {
        context.dispatch('getCart');
        context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'warning' }, { root: true });
        context.commit('LOADING', false, { root: true });
      });
    },
    showCart(context) {
      context.commit('ISCART_SHOW', true);
      setTimeout(() => {
        context.commit('ISCART_SHOW', false);
      }, 5000);
    },
  },
  mutations: {
    CART(state, payload) {
      state.carts = payload;
    },
    CART_LENGTH(state, payload) {
      state.cartsLength = payload;
    },
    ISCART_SHOW(state, payload) {
      state.isCartShow = payload;
    },
  },
  getters: {
    carts: state => state.carts,
    cartsLength: state => state.cartsLength,
    isCartShow: state => state.isCartShow,
  },
});
