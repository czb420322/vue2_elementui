import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      num:10
  },
  mutations: {
      add(state){
        state.num  = state.num+1;
      }
  },
  actions: {
  },
  modules: {
  }
})
