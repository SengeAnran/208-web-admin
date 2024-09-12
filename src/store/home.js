export default {
  namespaced: true,
  state: {
    searchData: '',
    questionRes: '',
    questionResList: [],
    useSearchData: false,
  },
  mutations: {
    SET_SEARCH_DATA(state, value) {
      state.searchData = value;
    },
    SET_QUESTION_RES(state, value) {
      state.questionRes = value;
    },
    SET_QUESTION_RES_LIST(state, value) {
      state.questionResList = value;
    },
    SET_USER_SEARCH_DATA(state, value) {
      state.useSearchData = value;
    },
  },
};
