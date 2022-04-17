import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'highlight.js/styles/default.css'

import 'amfe-flexible'
import '@/styles/icon.less'
import directiveObj from '@/utils/directive'
import './VueComponent.js' //Vant组件注册
Vue.use(directiveObj)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
