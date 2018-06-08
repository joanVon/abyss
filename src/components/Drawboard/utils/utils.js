import * as d3 from 'd3'

const D3Drawboard = () => {
  if (!(this instanceof D3Drawboard)) {
    return new D3Drawboard()
  }
}

// 缩放
D3Drawboard.zoomed = () => {
  var t = d3.event.transform
  // transform = d3.event.transform
  d3.select('svg>g').attr('transform', t)
}

// 拖拽定位
D3Drawboard.dragsubject = () => {
  d3.event.subject = [d3.event.x, d3.event.y]
}

// 拖拽方法
D3Drawboard.dragged = (d, draw) => {
  if (!draw) {
    d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y)
  } else {
    D3Drawboard.dragged = null
  }
}

// 开始拖拽 画笔状态改为涂鸦绘制 path
D3Drawboard.dragstarted = (lineConfig, transform, draw) => {
  // const lineConfig = this.lineConfig
  const line = d3.line().curve(d3.curveBasis)
  var d = d3.event.subject

  // let transform = this.transform
  let x0 = transform.invertX(d3.event.x)
  let y0 = transform.invertY(d3.event.y)

  let active = d3.select('svg>g').append('path').datum(d)

  if (!draw) {
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

export default {D3Drawboard}
