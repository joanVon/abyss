
<template>
  <div class="svg-wrap" id="orbitWrap"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Orbit',
  props: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },

    isZoom: { type: Boolean, default: false },  // 缩放
    isDrag: { type: Boolean, default: true },  // 拖拽

    dataPoints: { type: Array, default: [] },
    points: { type: Array, default: [] },
    imageData: { type: String, default: '' }
  },
  data () {
    return {
      margin: { top: -5, right: -5, bottom: -5, left: -5 },
      dataPoints: this.dataPoints,

      dragged: null,  // 拖拽的点
      selected: this.points[0],  // 默认选中第一个点

      drag: null,
      svg: null,

      container: null
    }
  },

  methods: {
    dragActive () {
      if (this.isDrag) {
        this.drag = d3.behavior.drag()
          .origin(function (d) { return d })
          .on('dragstart', this.dragstarted)
          .on('drag', this.dragged)
          .on('dragend', this.dragended)
      }
    },

    // 拖拽
    dragstarted (d) {
      d3.event.sourceEvent.stopPropagation()
      d3.select(this).classed('dragging', true)
    },
    dragged (d) {
      d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y)
    },
    dragended (d) {
      d3.select(this).classed('dragging', false)
    }
  },

  created () {
    this.dragActive()
  },
  mounted () {
    this.svg = d3.select('#orbitWrap').append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('tabindex', 1)
  }
}
</script>