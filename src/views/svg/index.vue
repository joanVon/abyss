<template>
  <div class="page-content drawboard">
    <drawboard :width="960" :height="500" :bgSrc="imgSrc" :controlLayout="controlLayout" :pathOptions='lineOption' @saveAsDataURI="printImage">
    </drawboard>

    <!-- 输出图片 img 显示 demo -->
    <div class="print-img">
      <img ref="printImage" :src="printSrc" alt="">
    </div>
  </div>
</template>

<script>
import Drawboard from '@/components/Drawboard'
export default {
  name: 'SvgBoard',
  components: { Drawboard },
  data () {
    return {
      controlLayout: [
        { type: 'drag', name: '拖拽', icon: 'el-icon-rank' },
        { type: 'pencil', name: '画笔', icon: 'el-icon-edit' },
        { type: 'remove', name: '删除', icon: 'el-icon-close' },
        { type: 'clear', name: '清空', icon: 'el-icon-delete' },
        { type: 'save', name: '保存', icon: 'el-icon-picture' }
      ],
      lineOption: { 'width': '15px' },  // 轨迹样式项配置
      printSrc: '',  // 输出图片显示
      imgSrc: ''  // 此处为Base64图片码流
    }
  },
  methods: {
    printImage (svgUri) {
      this.printSrc = svgUri
    }
  }
}
</script>

<style lang="less" scoped>
.drawboard {
  margin-top: 20px;
}
.drawboard-content {
  display: inline-block;
}
.print-img {
  width: 640px;
  height: 345px;
  display: inline-block;
  vertical-align: top;
  img {
    width: 100%;
  }
}
</style>

