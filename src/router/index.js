import Vue from 'vue'
import Router from 'vue-router'
import Guide from '@/views/guide/router'
import Board from '@/views/svg/router'
import Login from '@/views/login/router'

Vue.use(Router)

export default new Router({
  mode: '',
  base: '/dist',
  routes: [
    ...Guide, ...Login, ...Board
  ]
})
