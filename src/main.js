// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

import Element from 'element-ui'
import i18n from './i18n'

import 'normalize.css'
import './assets/style/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/reset.less'
import './assets/style/page.less'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.router = router
Vue.use(Vuex)
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
