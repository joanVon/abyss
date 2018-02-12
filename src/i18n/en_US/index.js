// import m from './m.js'
import hui from 'hui/lib/locale/lang/en.js'
import login from './modules/login'
import guide from './modules/guide'

export default {
  'el': hui.el,
  'm': Object.assign(login, guide)
}
