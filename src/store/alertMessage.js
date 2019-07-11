export default ({
  namespaced: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('PUSH_MESSAGE', {
        message,
        status,
        timestamp,
      });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessage(context) {
      context.commit('REMOVE_MESSAGE');
    },
    removeMessageWithTiming(context, timestamp) {
      const msg = [...context.state.messages];
      setTimeout(() => {
        msg.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            context.commit('REMOVE_MESSAGE', index);
          }
        });
      }, 1500);
    },
  },
  mutations: {
    PUSH_MESSAGE(state, msg) {
      state.messages.push(msg);
    },
    REMOVE_MESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
  },
  getters: {
    messages: state => state.messages,
  },
});
