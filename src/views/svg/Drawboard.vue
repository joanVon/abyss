<template>
  <div class="drawboard-content" :style="{width: width+'px', height: height+'px'}">
    <svg :width="width" :height="height"></svg>

    <div class="drawboard-toolbar">
      <el-tooltip v-for="(control, $index) in controlLayout" :key="$index" class="toolbar-opt" :class="control.type" effect="dark" :content="control.name" placement="top">
        <el-button type="text" :class="optActive === $index ? 'active' : ''" @click="handleControl(control, $index)">{{control.name}}</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

const LINE_CONFIG = {
  'fill': 'none',
  'opacity': '0.1',
  'stroke': 'tomato',
  'selected': '#fff',
  'width': '3px',
  'linejoin': 'round',
  'linecap': 'round'
}
export default {
  name: 'Drawboard',
  props: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },

    // 'pencil', 'drag', 'edit', 'remove', 'clear', 'save'
    controlLayout: {
      type: Array,
      default: () => {
        return [
          { type: 'drag', name: '拖拽' },
          { type: 'pencil', name: '画笔' },
          { type: 'remove', name: '删除' },
          { type: 'clear', name: '清空' },
          { type: 'save', name: '保存' }
        ]
      } },

    bgSrc: { type: String, default: '' },  // 背景图 Base64编码
    pathOptions: { type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    // 拖拽定位
    var dragsubject = () => {
      d3.event.subject = [d3.event.x, d3.event.y]
    }

    // 拖拽方法
    var dragged = (d) => {
      if (!this.draw) {
        d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y)
      } else {
        dragged = null
      }
    }

    // 开始拖拽 画笔状态改为涂鸦绘制 path
    var dragstarted = () => {
      const lineConfig = this.lineConfig
      const line = d3.line().curve(d3.curveBasis)
      var d = d3.event.subject

      let transform = this.transform
      let x0 = transform.invertX(d3.event.x)
      let y0 = transform.invertY(d3.event.y)

      let active = d3.select('svg>g').append('path').datum(d)

      if (!this.draw) {
        d3.event.sourceEvent.stopPropagation()
      } else {
        d3.event.on('drag', function () {
          let x1 = transform.invertX(d3.event.x)
          let y1 = transform.invertY(d3.event.y)
          let dx = x1 - x0
          let dy = y1 - y0

          if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1])
          else d[d.length - 1] = [x1, y1]

          active.attr('d', line)
            .style('fill', lineConfig.fill)
            .style('stroke', lineConfig.stroke)
            .style('stroke-width', lineConfig.width)
            .style('stroke-linejoin', lineConfig.linejoin)
            .style('stroke-linecap', lineConfig.linecap)
            .on('mouseover', function () {
              d3.select(this)
                .style('fill', lineConfig.selected)
                .style('fill-opacity', lineConfig.opacity)
            })
            .on('mouseout', function () {
              d3.select(this)
                .style('fill', lineConfig.fill)
            })
            .on('click', function (d) {
              if (d3.select(this).classed('selected')) {
                d3.select(this)
                    .attr('class', '')
                    .style('stroke', lineConfig.stroke)
              } else {
                d3.select(this)
                    .attr('class', 'selected')
                    .style('stroke', lineConfig.selected)
              }
            })
        })
      }
    }

    // 缩放
    var zoomed = () => {
      var t = d3.event.transform
      this.transform = d3.event.transform
      d3.select('svg>g').attr('transform', t)
    }
    return {
      // 参数
      lineConfig: Object.assign(LINE_CONFIG, this.pathOptions),

      svgWidth: this.width,
      svgHeight: this.height,
      // controlItems: this.controlLayout,

      draw: false,
      svgDrag: true,
      // editStatus: false,
      optActive: 0,

      svg: null,
      container: null,

      zoom: d3.zoom().scaleExtent([1, 10]).on('zoom', zoomed),
      drag: d3.drag().subject(dragsubject).on('drag', dragged),

      transform: d3.zoomIdentity,
      dragged: dragged,
      dragstarted: dragstarted,
      dragsubject: dragsubject
    }
  },

  methods: {
    initBoard () {
      let bgSrc = this.bgSrc
      this.svg = d3.select('svg')
      this.container = this.svg.append('g')
        .attr('class', 'bg-image')
        .append('image')
        .attr('xlink:href', bgSrc)
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', this.width)
        .attr('height', this.height)

      this.svg.call(this.drag)
      this.svg.call(this.zoom)
    },

    // 操作
    handleControl (control, index) {
      let transform = this.transform
      let dragstarted = this.dragstarted

      switch (control.type) {
        case 'pencil':
          this.draw = true
          this.dragged = null
          this.svg.attr('style', 'cursor: crosshair')

          this.drag.subject(function () { var p = [transform.invertX(d3.event.x), transform.invertY(d3.event.y)]; return [p, p] })
            .on('start', dragstarted)
          break

        case 'drag':
          this.svg.attr('style', 'cursor: move')
          this.draw = false
          this.drag.subject(this.dragsubject)
          .on('drag', this.dragged)
          break

        case 'remove':
          if (d3.selectAll('path.selected')._groups[0] && d3.selectAll('path.selected')._groups[0].length > 0) {
            this.svg.attr('style', 'cursor: pointer')
            d3.selectAll('path.selected').remove()
          } else {
            // alert('选择需要删除的画迹')
            this.$message({
              message: '选择需要删除的画迹',
              type: 'warning'
            })
            return false
          }
          break
        case 'clear':
          d3.selectAll('path').remove()
          break
        case 'save':
          d3.select('svg>g').attr('transform', 'translate(0, 0)scale(1)')
          let svgXML = '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString(document.getElementsByTagName('svg')[0])
          let encodedData = window.btoa(svgXML)

          let svgDataUri = 'data:image/svg+xml;base64,' + encodedData
          this.$emit('saveDatauri', svgDataUri)
          break
      }
      this.optActive = index
    }
  },
  mounted () {
    this.initBoard()
  }
}
</script>

<style lang="less" scoped>
.drawboard-content {
  position: relative;
  border: 1px solid #666;
  svg {
    cursor: move;
  }

  path {
    fill: none;
    stroke: tomato;
    stroke-width: 3px;
    stroke-linejoin: round;
    stroke-linecap: round;

    .selected {
      stroke: #ffffff;
    }
    &:hover {
      fill: #fff;
      fill-opacity: 0.2;
    }
  }
  .drawboard-toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(102, 102, 102, 0.7);
    button {
      color: #fff;
      display: inline-block;
      margin: 0 8px;
    }

    .toolbar-opt.active {
      color: tomato;
    }
  }
}
</style>
