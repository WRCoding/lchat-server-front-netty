import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    db: {}
  },
  getters: {
    getUser(state){
      return state.user
    },
    getDB(state){
      return state.db
    }
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    deleteUser(state){
      state.user = {}
    },
    setDB(state,db){
      state.db = db
    }
  },
  actions: {
  },
  modules: {
  }
})
