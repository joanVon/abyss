<template>
  <div class="drawboard-content" :style="{width: width+'px', height: height+'px'}">
    <transition name="fade">
      <p class="drawboard-alert" v-show="isAlert"></p>
    </transition>

    <svg :width="width" :height="height"></svg>

    <div class="drawboard-toolbar">
      <span v-for="(control, $index) in controlLayout" :key="$index" class="toolbar-opt" :class="optActive === $index ? control.type + ' active' : control.type" :title="control.name" @click="handleControl(control, $index)">
        <i v-if="!control.icon">{{control.name}}</i>
        <i v-else class="icon-tool" :class="control.icon"></i>
      </span>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

const LINE_CONFIG = {
  'fill': 'none',
  'opacity': '0.1',
  'stroke': 'tomato',
  'selected': '#eee',
  'width': '3px',
  'linejoin': 'round',
  'linecap': 'round'
}
export default {
  name: 'Drawboard',
  props: {
    width: { type: Number, default: 0, required: true },
    height: { type: Number, default: 0, required: true },

    // 'pencil', 'drag', 'edit', 'remove', 'clear', 'save'
    controlLayout: {
      type: Array,
      default: () => {
        return [
          { type: 'drag', name: '拖拽', icon: '' },
          { type: 'pencil', name: '画笔', icon: '' },
          // { type: 'polygon', name: '多边形', icon: '' },
          { type: 'remove', name: '删除', icon: '' },
          { type: 'clear', name: '清空', icon: '' },
          { type: 'save', name: '保存', icon: '' }
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
      const lineConfig = LINE_CONFIG
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

      draw: false,
      svgDrag: true,
      polygon: false,

      count: 0,
      points: [],
      // selected: this.points.length ? this.points[0] : null,

      svg: null,
      container: null,

      zoom: d3.zoom().scaleExtent([1, 10]).on('zoom', zoomed),  // 缩放范围 1~10 倍
      drag: d3.drag().subject(dragsubject).on('drag', dragged),  // 拖拽绑定

      transform: d3.zoomIdentity,
      dragged: dragged,
      dragstarted: dragstarted,
      dragsubject: dragsubject,

      optActive: 0,
      isAlert: false
    }
  },

  methods: {
    initBoard () {
      let bgSrc = this.bgSrc && this.bgSrc
      this.svg = d3.select('svg')
      this.container = this.svg.append('g')
        .attr('class', 'bg-image')
        .append('image')
        .attr('xlink:href', bgSrc)
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', this.width)
        .attr('height', this.height)

      this.svg.append('polygon')
        .attr('class', 'polygon-line')
        .style('fill', this.lineConfig.fill)
        .style('stroke', this.lineConfig.stroke)
        .style('stroke-width', this.lineConfig.width)
        .attr('id', 'polygon_' + this.count)

      this.svg.call(this.drag)
      this.svg.call(this.zoom).on('dblclick.zoom', null)
    },

    drawPolygon () {
      let lineConfig = this.lineConfig
      d3.select('svg>g').append('polygon')
        .attr('class', 'polygon-line')
        .style('fill', lineConfig.fill)
        .style('stroke', lineConfig.stroke)
        .style('stroke-width', lineConfig.width)
        .attr('id', 'polygon_' + this.count)
    },

    drawRestart () {
      let circle = this.svg.selectAll('circle')
        .data(this.points, function (d) { return d })

      circle.enter().append('circle')
        .transition()
        .attr('r', this.lineConfig.width)
        .attr('fill', this.lineConfig.fill)

      circle
        .classed('selected', function (d) { return d })
        .attr('cx', function (d) { return d[0] })
        .attr('cy', function (d) { return d[1] })

      // circle.exit().remove()

      if (d3.event) {
        d3.event.preventDefault()
        d3.event.stopPropagation()
      }
    },

    mousedown () {
      this.points.push(d3.mouse(this.svg.node()))
      d3.select('svg #polygon_' + this.count)
        .attr('points', this.points + ' ')
      // this.drawRestart()
    },

    dblclick () {
      this.count = this.count + 1
      this.points = []
      this.drawPolygon()

      // this.svg.selectAll('circle').remove()
    },

    // 操作
    handleControl (control, index) {
      let transform = this.transform
      let dragstarted = this.dragstarted

      switch (control.type) {
        case 'pencil':
          this.draw = true
          this.dragged = null
          this.polygon = false
          this.svg.attr('style', 'cursor: crosshair')

          this.drag.subject(function () { var p = [transform.invertX(d3.event.x), transform.invertY(d3.event.y)]; return [p, p] })
            .on('start', dragstarted)
          break

        // case 'polygon':
        //   this.polygon = true
        //   this.dragged = null
        //   this.svg.attr('style', 'cursor: crosshair')
        //   if (this.polygon) {
        //     this.svg
        //       .on('click', this.mousedown)
        //       .on('dblclick', this.dblclick)
        //   }

        //   break
        case 'drag':
          this.svg.attr('style', 'cursor: move')
          this.draw = false
          this.drag.subject(this.dragsubject)
            .on('drag', this.dragged)
          break

        case 'remove':
          this.svg.attr('style', 'cursor: pointer')
          this.draw = false
          this.drag.subject(this.dragsubject)
            .on('drag', this.dragged)
          if (d3.selectAll('path.selected')._groups[0] && d3.selectAll('path.selected')._groups[0].length > 0) {  // 选中 path 判断
            d3.selectAll('path.selected').remove()
          } else {
            // alert('选择需要删除的画迹')
            document.querySelector('.drawboard-alert').innerHTML = '选择需要删除的画迹'
            this.isAlert = true
            setTimeout(() => {
              this.isAlert = false
            }, 2000)
          }
          break
        case 'clear':
          d3.selectAll('path').remove()
          this.draw = false
          this.svg.attr('style', 'cursor: move')
          d3.select('svg>g').attr('transform', 'translate(0, 0)scale(1)')
          this.drag.subject(this.dragsubject)
            .on('drag', this.dragged)
          break
        case 'save':
          // const that = this
          const expImg = {}

          if (d3.selectAll('path.selected')._groups[0] && d3.selectAll('path.selected')._groups[0].length > 0) {
            document.querySelector('.drawboard-alert').innerHTML = '尚有选中轨迹未处理，请先处理'
            this.isAlert = true
            setTimeout(() => {
              this.isAlert = false
            }, 2000)
            return
          }
          d3.select('svg>g').attr('transform', 'translate(0, 0)scale(1)')

          // let svgHTML = d3.select('svg')
          //       .attr('version', 1.1)
          //       .attr('xmlns', 'http://www.w3.org/2000/svg')
          //       .node().outerHTML

          let svgXML = '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString(document.getElementsByTagName('svg')[0])
          // let encodedData = window.btoa(svgXML)
          // expImg.svgDataUri = 'data:image/svg+xml;base64,' + encodedData

          const img = new Image()
          // 给图片对象写入base64编码的svg流
          // https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa,btoa方法说明
          // image/svg+xml
          // img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)))

          expImg.svgDataUri = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)))
          img.src = expImg.svgDataUri

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          img.onload = () => {
            canvas.width = this.width
            canvas.height = this.height
            context.drawImage(img, 0, 0, this.width, this.height)
            img.src = canvas.toDataURL('image/png')
            expImg.pngUri = img.src
            this.$emit('saveAsDataURI', expImg)
          }

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

  .drawboard-alert {
    color: #e6a23c;
    background: #fdf6ec;
    box-sizing: border-box;
    border: 1px solid #fdf6ec;
    border-radius: 4px;
    width: 250px;
    font-size: 14px;
    padding: 10px 14px;
    line-height: 1;
    position: absolute;
    top: 20px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    align-items: center;
    transition: opacity 0.5s, transform 0.6s;
    box-shadow: 1px 1px #fdf6ec;
  }

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
    background-color: rgba(51, 51, 51, 0.7);
    span {
      color: #fff;
      display: inline-block;
      margin: 0 8px;
      cursor: pointer;

      i {
        font-style: normal;
      }
    }

    .toolbar-opt.remove:active {
      color: tomato;
      font-weight: 700;
    }

    .toolbar-opt.active {
      color: tomato;
      font-weight: 700;
    }
  }
}
</style>