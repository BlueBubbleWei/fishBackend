import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 初始化数据
const state = {
  count: 0
}
// 改变状态的方法
const mutations = {
  add (state) {
    state.count++
  },
  mul (state) {
    state.count--
  }
}
const getters = {
  count: function (state) {
    return state.count++
  }
}
const actions = {
  addAction (context) {
    context.commit('add', 10)
  },
  reduceAction ({commit}) {
    commit('reduce')
  }
}
var vuexStore = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
// 使用 export default 封装，让外部可以访问
export default vuexStore
