export default {
  namespaced: true,
  state: {
    searchData: {},
    useSearchData: false,
  },
  mutations: {
    SET_SEARCH_DATA(state, value) {
      state.searchData = value;
    },
    SET_USER_SEARCH_DATA(state, value) {
      state.useSearchData = value;
    },
  },
};
