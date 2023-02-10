export default {
  state: {
    shoppingCat: {},
    footInfo: {
      price: 0,
      num: 0,
    },
  },
  getters: {
    shoppingCat: (state) => state.shoppingCat,
    footInfo: (state) => state.footInfo,
  },
  actions: {},
  mutations: {
    SET_SHOPPING_CAT(state, data) {
      state.shoppingCat = data;
    },
    SET_FOOT_INFI(state, data) {
      state.footInfo = data;
    },
  },
};
