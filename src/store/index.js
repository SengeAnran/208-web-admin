import Vue from "vue";
import Vuex from "vuex";
import map from "./map";
import patentSearch from "./patentSearch";
import home from "./home";
import getters from "./getters";
import {getStorage, setStorage} from "../utils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeNavIndex: getStorage('activeNavIndex'),
  },
  mutations: {
    SET_ACTIVE_NAV_INDEX(state, value) {
      state.activeNavIndex = value;
      setStorage('activeNavIndex', value);
    }
  },
  actions: {},
  modules: {
    map,
    patentSearch,
    home,
  },
  getters: getters,
});
