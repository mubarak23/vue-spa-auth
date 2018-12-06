import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuelidate from 'vuelidate'

import router from './router'
import store from './store'

Vue.use(vuelidate)
axios.defaults.baseURL = 'https://stock-trader-34e57.firebaseio.com/'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
