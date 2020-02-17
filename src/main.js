import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'


axios.interceptors.request.use(function(config){  
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
