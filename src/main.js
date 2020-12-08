import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false

// 配置axios
Vue.prototype.$http = axios

// 配置请求的跟路径
axios.defaults.baseURL = 'http://localhost:3000/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

