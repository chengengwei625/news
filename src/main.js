import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { NavBar, Form, Field, Button, Toast } from 'vant'
import 'amfe-flexible'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
