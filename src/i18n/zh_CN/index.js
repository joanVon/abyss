import element from 'element-ui/lib/locale/lang/zh-CN.js'
import login from './modules/login'
import guide from './modules/guide'

export default {
  'el': element.el,
  'm': Object.assign(login, guide)
}
