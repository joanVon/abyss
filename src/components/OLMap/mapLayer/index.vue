<template>
  <div class="map-box">
    <div id='map' class="map"></div>
    <div class="modify-cm-box" v-if="showModifyCm">
      <el-button @click="cancelModify">取消</el-button>
      <el-button type='primary' @click="confirmModify">确定</el-button>
    </div>
    <m-hanlde-new v-else @opClick="hdOpClick" @legendClick="hdLegendClick" class="handle"></m-hanlde-new>
    <m-popup @close="closePopup" ref="mPopup">
      <m-area-form v-if="handleType === 'area'" :areaData="curAreaData" @cancel="closePopup" @save="areaSave"></m-area-form>
      <m-device-form v-if="handleType === 'device'" :deviceData="curDeviceData" @cancel="closePopup" @save="deviceSave"></m-device-form>
      <div v-if="handleType === 'msg'" class="msg-content">{{popupMsg}}
        <el-button type='primary' size='mini' @click.stop.prevent="hdModify">修改</el-button>
      </div>
    </m-popup>
  </div>
</template>
<script>
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
import mHanldeNew from '../components/m-handle-new'
import mPopup from '../components/m-popup'
import mAreaForm from '../components/m-area-form'
import mDeviceForm from '../components/m-device-form'

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
const areaTypeMap = {
  normal: '普通区域',
  danger: '危险区域'
}
export default {
  name: 'maplayer',
  components: { mHanldeNew, mPopup, mAreaForm, mDeviceForm },
  data () {
    return {
      map: {},
      projection: {},
      overlay: {},
      handleType: 'area',
      curAreaData: {
        areaPoints: '',
        areaValue: ''
      },
      popupMsg: '',
      curFeature: {}, // 存储修改或是添加时的feature
      drawSource: {}, // 存储绘画时的source源
      curModify: {}, // 存储当前的修改实例
      showModifyCm: false, // 控制修改时的操作按钮显示
      beforeModifyData: '', // 存储修改前的数据
      opActive: {},
      curDeviceData: {
        point: ''
      },
      layers: {},
      mapInfo: { id: 'gd100001', name: '海康威视三期', img: '/static/map/building-site.jpg', extent: [120.227471, 30.215046, 120.231756, 30.217909] },
      elements: {
        video: [
          { id: 'v10001', name: '摄像头', type: 'video', point: [120.228471, 30.216555] },
          { id: 'v10002', name: '摄像头', type: 'video', point: [120.229591, 30.216755] }
        ],
        env: [
          { id: 'e10001', name: '环境量', type: 'env', point: [120.229471, 30.216535] },
          { id: 'h10004', name: '环境量', type: 'env', point: [120.230871, 30.216855] }
        ],
        helmet: [
          { id: 'h10003', name: '安全帽', type: 'helmet', point: [120.228421, 30.216335] },
          { id: 'h10003', name: '安全帽', type: 'helmet', point: [120.230271, 30.216955] }
        ],
        dangerArea: [
          { id: 10000002, name: '危险区域', type: 'dangerArea', points: [[[120.229571, 30.217255], [120.229971, 30.216655], [120.231071, 30.216555], [120.229571, 30.217255]]] }
        ],
        generalArea: [
          { id: 10000001, name: '普通区域', type: 'generalArea', points: [[[120.228571, 30.215655], [120.229671, 30.215655], [120.229471, 30.216555], [120.228571, 30.215655]]] }
        ]
      }
    }
  },
  mounted () {
    this.initMap(Object.assign({ targetId: 'map', code: 'EPSG:4326', zoom: 3 }, this.mapInfo))
    this.initLayers(this.elements)
    this.bindMapClick()
    this.bindMapPointerMove()
  },
  methods: {
    // 初始化地图，生成一个场景图层
    initMap (mapInfo) {
      this.projection = new Projection({
        code: mapInfo.code,
        extent: mapInfo.extent
      })
      this.overlay = new Overlay({
        element: this.$refs.mPopup.$el,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.map = new Map({
        layers: [
          new ImageLayer({
            source: new ImageStatic({
              url: mapInfo.img,
              projection: this.projection,
              imageExtent: mapInfo.extent
            })
          })
        ],
        target: mapInfo.targetId,
        overlays: [this.overlay],
        view: new View({
          projection: this.projection,
          center: getCenter(mapInfo.extent),
          zoom: mapInfo.zoom
        })
      })
      return this
    },
    // 根据获取的元素数据初始化已有的图层
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
    bindMapClick () {
      this.map.on('click', (e) => {
        let curActive = this.opActive.curActive
        let coordinate = e.coordinate
        if (curActive === 'devicePointAdd') {
          this.curFeature = this.getElementFeature({ type: 'location', point: coordinate })
          this.drawSource.addFeature(this.curFeature)
          this.curDeviceData.point = coordinate
          this.overlay.setPosition(coordinate)
        }
        // 非添加状态时, 也不是修改状态时, 且此时没有任何弹窗弹出时便响应
        if (!curActive) {
          // 处理feature选中问题
          this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
            this.handleType = 'msg'
            this.curFeature = feature
            let data = feature.getProperties()
            this.popupMsg = (areaTypeMap[data.type] || '') + '' + data.name + ''
            this.overlay.setPosition(e.coordinate)
          })
        }
      })
    },
    bindMapPointerMove () {
      let map = this.map
      map.on('pointermove', (e) => {
        if (e.dragging) {
          // this.overlay.setPosition(undefined)
          return
        }
        let pixel = map.getEventPixel(e.originalEvent)
        let hit = map.hasFeatureAtPixel(pixel)
        map.getTargetElement().style.cursor = hit ? 'pointer' : ''
      })
    },
    unBindMapEvent (eventType) {
      this.map.removeEventListener(eventType)
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
    // 获取元素的feature
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
    addDrawLayer (type) {
      this.drawSource = new VectorSource()
      this.drawLayer = new VectorLayer({
        source: this.drawSource,
        style: this.getElementStyle({ type: type === 'Polygon' ? 'default' : 'location' })
      })
      this.map.addLayer(this.drawLayer)
      // 在画区域的时候，需要加绘制层， 而画标记点不用
      if (type === 'Polygon') {
        this.curDraw = new Draw({ source: this.drawSource, type })
        this.map.addInteraction(this.curDraw)
        this.curDraw.on('drawend', (e) => {
          this.curFeature = e.feature
          this.handleType = 'area'
          let curPolygon = this.curFeature.getGeometry()
          this.overlay.setPosition(curPolygon.getFirstCoordinate())
          this.curAreaData = {
            areaPoints: curPolygon.getCoordinates(),
            areaValue: curPolygon.getArea()
          }
          // 停止绘制交互
          this.map.removeInteraction(this.curDraw)
        })
      }
    },
    // 区域添加 需要增加一个矢量修改图层作为修改数据凭借，只能画polygon
    hdOpClick (data) {
      this.opActive = data
      this.handleType = ''
      let curActive = data.curActive
      if (!curActive) {
        this.bindMapClick()
      } else {
        this.unBindMapEvent('click')
      }
      // 先关掉还是打开状态的弹窗
      this.overlay.setPosition(undefined)
      switch (data.lastActive) {
        case 'areaAdd':
          this.map.removeInteraction(this.curDraw)
          this.map.removeLayer(this.drawLayer)
          break
        case 'devicePointAdd':
          this.map.removeInteraction(this.curDraw)
          this.map.removeLayer(this.drawLayer)
          break
      }
      switch (data.curActive) {
        case 'areaAdd':
          this.handleType = 'area'
          this.addDrawLayer('Polygon')
          break
        case 'devicePointAdd':
          this.handleType = 'device'
          this.addDrawLayer('Point')
          break
      }
    },
    hdModify (e) {
      this.showModifyCm = true // 显示操作按钮
      let data = this.beforeModifyData = this.curFeature.getProperties()
      let source = this.layers[data.type + 'Layer'].getSource()
      let option = { source: source, features: [this.curFeature] }
      if (markers.indexOf(data.type) > -1) {
        option = Object.assign(option, { style: this.getElementStyle(data, true) })
      }
      this.curModify = new Modify(option)
      this.map.addInteraction(this.curModify)
      this.overlay.setPosition(undefined)
    },
    // 取消修改
    cancelModify () {
      this.handleType = ''
      let data = this.curFeature.getProperties()
      // let targetLayer = this.layers[data.type + 'Layer']
      let source = this.layers[data.type + 'Layer'].getSource()
      this.map.removeInteraction(this.curModify)
      source.removeFeature(this.curFeature)
      source.addFeature(this.getElementFeature(this.beforeModifyData))
      this.beforeModifyData = ''
      this.showModifyCm = false
      this.bindMapClick()
    },
    // 确认修改
    confirmModify () {
      let data = this.curFeature.getProperties()
      this.showModifyCm = false
      this.map.removeInteraction(this.curModify)
      if (['generalArea', 'dangerArea'].indexOf(data.type) > -1) {
        this.handleType = 'area'
        let curPolygon = this.curFeature.getGeometry()
        this.overlay.setPosition(curPolygon.getFirstCoordinate())
        this.curAreaData = {
          areaPoints: curPolygon.getCoordinates(),
          areaValue: curPolygon.getArea()
        }
      } else {
        this.handleType = 'device'
        let curPoint = this.curFeature.getGeometry()
        let coordinate = curPoint.getCoordinates()
        this.curDeviceData.point = coordinate
        this.overlay.setPosition(coordinate)
      }
    },
    // 处理图例点击事件 批量显示对于类型区域和标注
    hdLegendClick (data) {
      for (let layer in this.layers) {
        this.map.removeLayer(this.layers[layer])
      }
      data.forEach((item) => {
        this.map.addLayer(this.layers[item + 'Layer'])
      })
    },
    // 处理弹窗关闭事件
    closePopup () {
      this.handleType = ''
      this.overlay.setPosition(undefined)
      let curActive = this.opActive.curActive
      if (['areaAdd', 'devicePointAdd'].indexOf(curActive) > -1) {
        this.drawSource.removeFeature(this.curFeature)
      }
      if (this.beforeModifyData) {
        this.cancelModify()
      }
      // this.curFeature = {}
      return false
    },
    areaSave (data) {
      let areaType = ['generalArea', 'dangerArea'][data.areaType - 1]
      this.overlay.setPosition(undefined)
      // todo 在保存到后台以后, 将凭借图层上画好的矢量图数据丢到对应类型的区域图层上
      let featureId = this.curFeature.getId()
      if (!featureId) {  // 此处会判定是添加区域，还是修改区域
        this.curFeature.setId(data.id) // id从获取，后台打上唯一标记
        this.drawSource.removeFeature(this.curFeature)
        this.layers[areaType + 'Layer'].getSource().addFeature(this.curFeature)
      } else {
        this.map.removeInteraction(this.curModify)
        this.beforeModifyData = ''
        this.showModifyCm = false
      }
      this.curFeature.setProperties(data)
      this.curFeature.setStyle(this.getElementStyle({ name: data.name, type: areaType }))
    },
    deviceSave (data) {
      this.overlay.setPosition(undefined)
      let deviceType = ['video', 'env'][data.deviceType - 1]
      let featureId = this.curFeature.getId()
      // todo 向后台存储数据后 更新界面样式
      // 置空窗口类型
      this.handleType = ''
      // 判定是正在添加标记点
      if (!featureId) {
        this.curFeature.setId(data.id) // id从获取，后台打上唯一标记
        this.drawSource.removeFeature(this.curFeature)
        this.layers[deviceType + 'Layer'].getSource().addFeature(this.curFeature)
      } else {
        this.map.removeInteraction(this.curModify)
        this.beforeModifyData = ''
        this.showModifyCm = false
      }
      this.curFeature.setStyle(this.getElementStyle({ name: data.name, type: deviceType }))
    }
  }
}
</script>
<style lang='less' scoped>
.map-box {
  position: relative;
}
.handle {
  position: absolute;
  z-index: 10000;
  top: 20px;
  right: 20px;
}
.modify-cm-box {
  position: absolute;
  top: 20px;
  left: 50px;
}
</style>