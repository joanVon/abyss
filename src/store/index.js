import Vue from 'vue'
import Vuex from 'vuex'
// vuex核心之一
// 改变store中各个数据的唯一方法  异步
import actions from './actions'
// 改变store中各个数据的唯一方法 同步
import mutations from './mutations'
// 一个方便的工具级接口，可以方便的构建全局state自定义方法
import getters from './getters'
// 只是把store中的各个数据都保存在这里，方便查看
import state from './states'

Vue.use(Vuex)

// 最终所有的部分都汇聚到此，这就是store对象
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
