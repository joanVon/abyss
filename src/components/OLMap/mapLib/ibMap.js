import Projection from 'ol/proj/Projection'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import { Draw, Modify } from 'ol/interaction'
import { Vector as VectorLayer, Image as ImageLayer } from 'ol/layer'
import { Vector as VectorSource, ImageStatic } from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'
import { getCenter } from 'ol/extent'
import { Polygon, Point } from 'ol/geom'

const icons = {
  video: '/static/map/markers/video-nl.png', // 摄像设备
  env: '/static/map/markers/env-nl.png', // 环境量监测设备,
  helmet: '/static/map/markers/helmet-nl.png',
  'helmet-danger': '/static/map/markers/helmet-danger.png',
  'env-danger': '/static/map/markers/env-danger.png',
  'video-danger': '/static/map/markers/video-danger.png',
  location: '/static/map/markers/location.png'
}
const markers = ['video', 'env', 'helmet', 'location']
const areaThemes = {
  generalArea: { fillColor: 'rgba(0, 78, 49, 0.5)', strokeColor: 'rgba(0, 78, 49, 0.81)', imageColor: 'rgba(0, 78, 49, 0.81)' },
  dangerArea: { fillColor: 'rgba(227, 49, 9, 0.65)', strokeColor: '#e36209', imageColor: '#e36209' },
  default: { fillColor: 'rgba(255, 255, 255, .2)', strokeColor: '#ffcc33', imageColor: '#ffcc33' }
}

/**
 *
 * @param {*} args
 */
const IbMap = function (args) {
  this.init(args)
}
IbMap.prototype = {
  layers: {},
  popup: {},
  /**
   * 初始化地图
   * @param {*} args ={
   * id: 'gd100001',
   * name: '海康威视三期',
   * img: '/static/map/building-site.jpg',
   * extent: [120.227471, 30.215046, 120.231756, 30.217909]
   * }
   */
  init (args) {
    this.projection = new Projection({
      code: args.code,
      extent: args.extent
    })
    this.popup = new Overlay({
      element: args.overlayEl,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    })
    this.map = new Map({
      layers: [
        new ImageLayer({
          source: new ImageStatic({
            url: args.img,
            projection: this.projection,
            imageExtent: args.extent
          })
        })
      ],
      target: args.targetId,
      overlays: [this.popup],
      view: new View({
        projection: this.projection,
        center: getCenter(args.extent),
        zoom: args.zoom
      })
    })
    this.showCursor()
    return this
  },
  /**
   * 根据获取的元素数据初始化已有的图层
   * @param {object} elements={
        video: [
          { id: 'v10001', name: '摄像头', type: 'video', point: [120.228471, 30.216555] },
          { id: 'v10002', name: '摄像头', type: 'video', point: [120.229591, 30.216755] }
        ],
        env: [
          { id: 'e10001', name: '环境量', type: 'env', point: [120.229471, 30.216535] },
          { id: 'h10004', name: '环境量', type: 'env', point: [120.230871, 30.216855] }
        ],
        helmet: [
          { id: 'h10003', name: '安全帽', type: 'helmet',point: [120.228421, 30.216335] },
          { id: 'h10003', name: '安全帽', type: 'helmet', point: [120.230271, 30.216955] }
        ],
        dangerArea: [
          { id: 10000002, name: '危险区域', type: 'dangerArea', points: [[[120.229571, 30.217255], [120.229971, 30.216655], [120.231071, 30.216555], [120.229571, 30.217255]]] }
        ],
        generalArea: [
          { id: 10000001, name: '普通区域', type: 'generalArea', points: [[[120.228571, 30.215655], [120.229671, 30.215655], [120.229471, 30.216555], [120.228571, 30.215655]]] }
        ]
      }
   */
  initLayers (elements) {
    for (let prop in elements) {
      if (elements[prop].length) {
        this.layers[prop + 'Layer'] = new VectorLayer({
          source: new VectorSource({
            features: elements[prop].map((item) => {
              return this.getElementFeature(item)
            }) // 获取对应元素的feature
          })
        })
        this.map.addLayer(this.layers[prop + 'Layer'])
      }
    }
  },
  // 绑定地图事件
  bindMapEvent (eventType, cb) {
    this.map.on(eventType, (e) => { cb(e) })
  },
  unBindMapEvent (eventType) {
    this.map.removeEventListener(eventType)
  },
  /**
   * 使用ol的api ， 做判定点中的是否是feature元素
   */
  forEachFeatureAtPixel (pixel, cb) {
    this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
      cb(feature, layer)
    })
  },
  // 根据元素类型返回对应元素的style 当前只包含marker 和 多边形区域的样式
  // data {name: '元素名称', type: '有env,helmet,video,dangerarea,generalarea'}
  // 以及两个默认值， location和default 前者用设备标记时的默认图标，后者则是画区域时的默认样式
  // modify 用来判定是否在修改状态的样式
  getElementStyle (data, modify) {
    let fillColor = modify ? '#aa3300' : '#ccc'
    let strokeColor = modify ? '#ffcc33' : '#333'
    let isPoint = markers.indexOf(data.type) > -1 // 判定是否都是标注点类别
    let text = new Text({
      textAlign: 'center',
      textBaseLine: 'middle',
      font: 'normal 14px 微软雅黑',
      text: data.name || (isPoint ? '标注' : '区域'),
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({ color: strokeColor, width: 2 })
    })
    return isPoint
      ? new Style({
        image: new Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icons[data.type],
          opacity: 0.75
        })),
        text
      })
      : new Style({
        fill: new Fill({ color: areaThemes[data.type].fillColor }),
        stroke: new Stroke({ color: areaThemes[data.type].strokeColor, width: 2 }),
        image: new CircleStyle({ radius: 7, fill: new Fill({ color: areaThemes[data.type].imageColor }) }),
        text
      })
  },
  /**
   * 获取元素的feature
   * @param {object} data = {
   *  id: 'v10001',
   *  name: '摄像头',
   *  type: 'video',
   *  point: [120.228471, 30.216555]
   * }
   */
  getElementFeature (data) {
    let style = this.getElementStyle(data)
    let feature = new Feature(Object.assign({}, data, {
      geometry: markers.indexOf(data.type) > -1
        ? new Point(data.point)
        : new Polygon(data.points)
    }))
    data.id && feature.setId(data.id) // 有id则赋值id
    feature.setStyle(style)
    return feature
  },
  // 根据type(polygon, point)类型增加一个绘制矢量图的图层
  /**
   * 添加绘制图层
   * @param {string} type // Polygon / Point
   */
  addDrawLayer (type, drawAreaCb, drawPointCb) {
    this.drawSource = new VectorSource()
    let style = this.getElementStyle({ type: type === 'Polygon' ? 'default' : 'location' })
    this.drawLayer = new VectorLayer({
      source: this.drawSource, style
    })
    this.map.addLayer(this.drawLayer)
    // 在画区域的时候，需要加绘制层， 而画标记点不用
    this.curDraw = new Draw({
      source: this.drawSource, type, style
    })
    if (type === 'Polygon') {
      this.curDraw.on('drawend', (e) => {
        this.curFeature = e.feature
        let curPolygon = this.curFeature.getGeometry()
        drawAreaCb({
          areaPoints: curPolygon.getCoordinates(),
          areaValue: curPolygon.getArea(),
          firstCoordinate: curPolygon.getFirstCoordinate(),
          feature: this.curFeature
        })
      })
    } else {
      this.curDraw.on('drawend', (e) => {
        this.curFeature = e.feature
        let curPoint = this.curFeature.getGeometry()
        let coordinate = curPoint.getFirstCoordinate()
        drawPointCb({
          point: coordinate,
          feature: this.curFeature
        })
      })
    }
    this.map.addInteraction(this.curDraw)
  },
  /**
   * 停止绘制交互
   */
  stopDraw () {
    this.map.removeInteraction(this.curDraw)
  },
  /**
   * 重新开启当前绘制
   */
  reDraw () {
    this.map.addInteraction(this.curDraw)
  },
  /**
   * 删除绘制图层，和相关交互
   */
  removeDrawLayer () {
    this.curDraw.removeEventListener('drawend')
    this.map.removeInteraction(this.curDraw)
    this.map.removeLayer(this.drawLayer)
  },
  /**
   * 响应地图点击时, 在当前添加图层，添加默认点位
   */
  addMarker (coordinate) {
    let curFeature = this.getElementFeature({ type: 'location', point: coordinate })
    this.drawSource.addFeature(curFeature)
    this.setPopupPosition(coordinate)
    return curFeature
  },
  /**
   * 定位弹窗位置
   * @param {array} coordinate
   */
  setPopupPosition (coordinate) {
    this.popup.setPosition(coordinate)
  },
  /**
   * 在feature上显示手型
   */
  showCursor () {
    let map = this.map
    map.on('pointermove', (e) => {
      if (e.dragging) {
        // ibMap.setPopupPosition(undefined)
        return
      }
      let pixel = map.getEventPixel(e.originalEvent)
      let hit = map.hasFeatureAtPixel(pixel)
      map.getTargetElement().style.cursor = hit ? 'pointer' : ''
    })
    return this
  },
  /**
   * 修改目标feature
   */
  modifyFeature (targetFeature) {
    let data = targetFeature.getProperties()
    let source = this.layers[data.type + 'Layer'].getSource()
    let option = { source: source, features: [targetFeature] }
    if (markers.indexOf(data.type) > -1) {
      option = Object.assign(option, { style: this.getElementStyle(data, true) })
    }
    this.modify = new Modify(option)
    this.map.addInteraction(this.modify)
    this.setPopupPosition(undefined)
    return this.modify
  },
  /**
   * 取消feature绘制
   * @param {object} lastFeatureData 绘制前的featureData数据
   * @param {object} targetFeature 当前正在绘制的feature
   * @param {object} targetModify 当前的绘制modify实例
   */
  removeFeatureModify (lastFeatureData, targetFeature, targetModify) {
    let data = targetFeature.getProperties()
    let source = this.layers[data.type + 'Layer'].getSource()
    this.map.removeInteraction(targetModify)
    source.removeFeature(targetFeature)
    source.addFeature(this.getElementFeature(lastFeatureData))
  },
  /**
   * 在添加后执行取消操作
   */
  cancelAfterAdd (targetFeature) {
    this.drawSource.removeFeature(targetFeature)
  },

  /**
   * 添加图层
   * @param {object} layer
   */
  addLayer (layer) {
    this.map.addLayer(layer)
  },
  /**
  * 删除图层
  * @param {object} layer
  */
  removeLayer (layer) {
    this.map.removeLayer(layer)
  },
  /**
   * 批显图层
   * @param {Array} layerTypes // 根据元素分类生成图层的类型分组
   */
  showLayers (layerTypes) {
    for (let layer in this.layers) {
      this.map.removeLayer(this.layers[layer])
    }
    layerTypes.forEach((item) => {
      this.map.addLayer(this.layers[item + 'Layer'])
    })
  },
  updateFeatureAfterAdd (featureData, targetFeature, targetModify) {
    this.setPopupPosition(undefined)
    this.map.removeInteraction(targetModify)
    this.curFeature.setId(featureData.id) // id从获取，后台打上唯一标记
    this.layers[featureData.type + 'Layer'].getSource().addFeature(this.curFeature)
    targetFeature.setProperties(featureData)
    targetFeature.setStyle(this.getElementStyle(featureData))
  },
  updateFeatureAfterModify (lastFeatureData, featureData, targetFeature, targetModify) {
    this.setPopupPosition(undefined)
    this.map.removeInteraction(targetModify)
    // 说明此时修改了类型，则将该feature放置对应的图层上，并将原类型图层上的feature删除
    if (lastFeatureData.type !== featureData.type) {
      this.layers[lastFeatureData.type + 'Layer'].getSource().removeFeature(targetFeature)
      this.layers[featureData.type + 'Layer'].getSource().addFeature(targetFeature)
    }
    targetFeature.setProperties(featureData)
    targetFeature.setStyle(this.getElementStyle(featureData))
  }
}

export default IbMap
