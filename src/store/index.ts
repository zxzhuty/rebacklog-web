import Vue from "vue";
import Vuex from "vuex";
// @ts-ignore
import setting from "./modules/setting";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : ""
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem("Authorization", user.Authorization);
    }
  },
  actions: {},
  modules: { setting }
});
