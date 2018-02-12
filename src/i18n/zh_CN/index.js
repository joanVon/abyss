import hui from 'hui/lib/locale/lang/zh-CN.js'
import login from './modules/login'
import guide from './modules/guide'

export default {
  'el': hui.el,
  'm': Object.assign(login, guide)
}
