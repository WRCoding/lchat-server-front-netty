import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        db: {},
        map: new Map(),
        errorMap: new Map()
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getDB(state) {
            return state.db
        },
        getMap(state){
            return state.map
        },
        getErrorMap(state){
            return state.errorMap
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state) {
            state.user = {}
        },
        setDB(state, db) {
            state.db = db
        },
        setMap(state, map){
            state.map = new Map()
            state.map = map
        },
        setErrorMap(state,map){
            state.errorMap = new Map()
            state.errorMap = map
        }
    },
    actions: {},
    modules: {}
})
