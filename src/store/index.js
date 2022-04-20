import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://s3.bmp.ovh/imgs/2022/04/18/ed99bd814f653659.jpg',
    userName: '陈耿伟'
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
