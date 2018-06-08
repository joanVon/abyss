import Drawboard from './pencil.vue'

Drawboard.install = function (Vue) {
  Vue.component(Drawboard.name, Drawboard)
}

export default Drawboard
