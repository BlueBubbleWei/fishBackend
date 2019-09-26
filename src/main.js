// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' /* 引入elementui css */
// import VueRouter from 'vue-router'
import Nav from './components/Nav'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(ElementUI)
// Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // render 会让模板由APP变为Nav
  render: h => h(Nav),
  router,
  store,
  components: { App },
  template: '<App/>'
})
