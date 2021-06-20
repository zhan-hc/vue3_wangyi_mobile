import { createStore } from 'vuex'
import { store } from "./store"
import mutations from "./mutations";
export default createStore({
  state: store,
  mutations: mutations,
  actions: {
  },
  modules: {
  }
})
