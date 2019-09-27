// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' /* 引入elementui css */
// Vue.config.productionTip = false

import './utils/permission'
import serviceManger from '@/service/index' // 请求服务的所有代码
import '../mock/index' // mock.js
import Router from 'vue-router'

Vue.prototype.$serviceManger = serviceManger
Vue.use(ElementUI)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
