// import m from './m.js'
import Element from 'element-ui/lib/locale/lang/en.js'
import login from './modules/login'
import guide from './modules/guide'

export default {
  'el': Element.el,
  'm': Object.assign(login, guide)
}
