<template>
  <div class="orbit-view" id="orbitView">
    <orbit :width="960" :height="500"></orbit>
  </div>
</template>

<script>
import Orbit from './Orbit4D3'
export default {
  // name: 'OrbitPage',
  components: {Orbit}
}
</script>
