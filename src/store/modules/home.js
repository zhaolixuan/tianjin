export default {
  state: {
    infoName: "",
  },
  getters: {
    infoName: (state) => state.infoName,
  },
  actions: {},
  mutations: {
    SET_INFO_NAME(state, data) {
      state.infoName = data;
    },
  },
};
