import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://s1.ax1x.com/2022/04/17/LtqevF.jpg',
    userName: ''
  },
  getters: {},
  mutations: {
    //编码风格,这里最好大写
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    },
    SET_USERNAME(state, value) {
      state.userName = value
    }
  },
  actions: {},
  modules: {}
})
