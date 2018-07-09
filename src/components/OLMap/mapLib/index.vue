<template>
  <div class="map-box">
    <div id='map' class="map"></div>
    <div class="modify-cm-box" v-if="showModifyCm">
      <el-button @click="cancelModify">取消</el-button>
      <el-button type='primary' @click="confirmModify">确定</el-button>
    </div>
    <m-hanlde-new v-else @opClick="hdOpClick" @legendClick="hdLegendClick" class="handle"></m-hanlde-new>
    <m-popup @close="closePopup" ref="mPopup">
      <m-area-form v-if="handleType === 'Polygon'" :areaData="curAreaData" @cancel="closePopup" @save="areaSave"></m-area-form>
      <m-device-form v-if="handleType === 'Point'" :deviceData="curDeviceData" @cancel="closePopup" @save="deviceSave"></m-device-form>
      <div v-if="handleType === 'msg'" class="msg-content">{{popupMsg}}
        <el-button type='primary' size='mini' @click.stop.prevent="hdModify">修改</el-button>
      </div>
    </m-popup>
  </div>
</template>
<script>
import mHanldeNew from '../components/m-handle-new'
import mPopup from '../components/m-popup'
import mAreaForm from '../components/m-area-form'
import mDeviceForm from '../components/m-device-form'

import IbMap from '../ibMap'
let ibMap
export default {
  name: 'maplayer',
  components: { mHanldeNew, mPopup, mAreaForm, mDeviceForm },
  data () {
    return {
      handleType: '',
      popupMsg: '',
      curFeature: {}, // 存储修改或是添加时的feature
      curModify: {}, // 存储当前的修改实例
      showModifyCm: false, // 控制修改时的操作按钮显示
      beforeModifyData: '', // 存储修改前的数据
      opActive: {},
      curAreaData: {
        areaPoints: '',
        areaValue: ''
      },
      curDeviceData: {
        point: ''
      },
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
    ibMap = new IbMap(Object.assign({ targetId: 'map', code: 'EPSG:4326', zoom: 3, overlayEl: this.$refs.mPopup.$el }, this.mapInfo))
    ibMap.initLayers(this.elements)
    this.bindMapClick()
  },
  methods: {
    bindMapClick () {
      ibMap.bindMapEvent('click', (e) => {
        let curActive = this.opActive.curActive
        let coordinate = e.coordinate
        // 非添加状态时, 也不是修改状态时, 且此时没有任何弹窗弹出时便响应
        if (!curActive) {
          // 处理feature选中问题
          ibMap.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
            this.handleType = 'msg'
            this.curFeature = feature
            let data = feature.getProperties()
            this.popupMsg = data.name
            ibMap.setPopupPosition(coordinate)
          })
        }
      })
    },
    unBindMapEvent (eventType) {
      ibMap.unBindMapEvent(eventType)
    },

    // 区域添加 需要增加一个矢量修改图层作为修改数据凭借，只能画polygon
    hdOpClick (data) {
      this.opActive = data
      // 先关掉还是打开状态的弹窗
      ibMap.setPopupPosition(undefined)
      let drawTypeObj = {
        'areaAdd': 'Polygon',
        'devicePointAdd': 'Point'
      }
      if (data.lastActive) {
        ibMap.removeDrawLayer()
      }
      if (data.curActive) {
        this.handleType = drawTypeObj[data.curActive]
        ibMap.addDrawLayer(
          this.handleType,
          (areaData) => {
            this.curAreaData = areaData
            ibMap.setPopupPosition(areaData.firstCoordinate)
            ibMap.stopDraw()
            this.curFeature = areaData.feature
          }, (pointData) => {
            this.curDeviceData.point = pointData.point
            ibMap.setPopupPosition(pointData.point)
            ibMap.stopDraw()
            this.curFeature = pointData.feature
          }
        )
      }
    },
    hdModify (e) {
      this.showModifyCm = true // 显示操作按钮
      this.beforeModifyData = this.curFeature.getProperties()
      this.curModify = ibMap.modifyFeature(this.curFeature)
      this.unBindMapEvent('click')
    },
    // 取消修改
    cancelModify () {
      this.handleType = ''
      ibMap.removeFeatureModify(this.beforeModifyData, this.curFeature, this.curModify)
      this.beforeModifyData = ''
      this.showModifyCm = false
      this.bindMapClick()
    },
    // 确认修改
    confirmModify () {
      let data = this.curFeature.getProperties()
      this.showModifyCm = false
      if (['generalArea', 'dangerArea'].indexOf(data.type) > -1) {
        this.handleType = 'Polygon'
        let curPolygon = this.curFeature.getGeometry()
        ibMap.setPopupPosition(curPolygon.getFirstCoordinate())
        this.curAreaData = {
          areaPoints: curPolygon.getCoordinates(),
          areaValue: curPolygon.getArea()
        }
      } else {
        this.handleType = 'Point'
        let curPoint = this.curFeature.getGeometry()
        let coordinate = curPoint.getCoordinates()
        this.curDeviceData.point = coordinate
        ibMap.setPopupPosition(coordinate)
      }
    },
    // 处理图例点击事件 批量显示对于类型区域和标注
    hdLegendClick (data) {
      ibMap.showLayers(data)
    },
    // 处理弹窗关闭事件
    closePopup () {
      ibMap.setPopupPosition(undefined)
      let curActive = this.opActive.curActive
      if (curActive === 'devicePointAdd' || curActive === 'areaAdd') {
        ibMap.cancelAfterAdd(this.curFeature)
        // 若是关闭了添加弹窗，则需要恢复绘制交互
        ibMap.reDraw()
      }
      if (this.beforeModifyData) {
        this.cancelModify()
      }
      // this.curFeature = {}
      return false
    },
    areaSave (data) {
      // todo 在保存到后台以后, 将凭借图层上画好的矢量图数据丢到对应类型的区域图层上
      let featureId = this.curFeature.getId()
      this.doSave(featureId, data)
    },
    deviceSave (data) {
      let featureId = this.curFeature.getId()
      // todo 向后台存储数据后 更新界面样式
      // 置空窗口类型
      // 判定是正在添加标记点
      this.doSave(featureId, data)
    },
    doSave (featureId, data) {
      if (!featureId) {  // 此处会判定是添加区域，还是修改区域
        ibMap.updateFeatureAfterAdd(data, this.curFeature, this.curModify)
        // 保存了添加数据，还需要恢复绘制交互，方便继续添加
        ibMap.reDraw()
      } else {
        ibMap.updateFeatureAfterModify(this.beforeModifyData, data, this.curFeature, this.curModify)
        this.beforeModifyData = ''
        this.showModifyCm = false
      }
      this.bindMapClick()
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
