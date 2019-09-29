// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' /* 引入elementui css */
import serviceManger from '@/service/index' // 请求服务的所有代码
// Vue.config.productionTip = false

import './utils/permission'
import '../mock/index' // mock.js
import Router from 'vue-router'
import i18n from './lang'
import echarts from 'echarts'

Vue.prototype.$serviceManger = serviceManger
Vue.prototype.$echarts = echarts
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
