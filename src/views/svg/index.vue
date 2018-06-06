<template>
  <div class="page-content drawboard">
    <Drawboard :width="960" :height="500"></Drawboard>
  </div>
</template>

<script>
// import * as d3 from 'd3'
import Drawboard from './pencil'
export default {
  name: 'SvgBoard',
  components: {Drawboard},
  data () {
    return {
      // 参数

    }
  }
}
</script>
