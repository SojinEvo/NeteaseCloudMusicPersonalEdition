import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arr: []
  },
  mutations: {
    setarr (state, list) {
      state.arr = list
    }
  },
  actions: {
  },
  modules: {
  }
})
