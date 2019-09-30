import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import router from './modules/router'
import app from './modules/app'
// import tagsview from './modules/tagsview'
// import getters from './modules/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    router,
    app
  }
})
