import Vue from 'vue'
import Router from 'vue-router'
import Guide from '@/views/guide/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '',
  routes: [
    ...Guide
  ]
})
