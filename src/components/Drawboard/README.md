## 画板 Drawboard

**基本需求**

1. 自定义图层尺寸，导入底图（以Base64码流传输）
2. 自定义画笔样式、选择删除涂鸦、清空涂鸦轨迹
3. 支持缩放、拖拽
4. 导出完成图片，含涂鸦样式

***

### API

**Attributes**

| 参数            | 说明                        | 类型     | 可选值  | 默认值         |
| ------------- | ------------------------- | ------ | ---- | ----------- |
| width         | 画板宽度                      | Number | 必填   | 0           |
| height        | 画板高度                      | Number | 必填   | 0           |
| bgSrc         | 底图 参数为图片Base64码流          | String | -    | ''          |
| pathOptions   | 画笔轨迹样式配置 详见 [LINE_CONFIG] | Object | -    | LINE_CONFIG |
| controlLayout | 工具栏操作项 详见 [CONTROLS]      | Array  | -    | CONTROLS    |

**LINE_CONFIG**

| 属性       | 默认值    | 说明              |
| -------- | ------ | --------------- |
| fill     | none   | 轨迹填充样式          |
| stroke   | tomato | 轨迹默认色值          |
| width    | 3px    | 涂鸦轨迹粗细默认值       |
| selected | #eee   | 轨迹选中色值          |
| opacity  | 0.1    | 轨迹填充透明度 选择时区分显示 |

**CONTROLS**

| 类型     | ICON | 名称                   |
| ------ | ---- | -------------------- |
| drag   | -    | 拖拽                   |
| pencil | -    | 画笔                   |
| remove | -    | 删除                   |
| clear  | -    | 清空历史                 |
| save   | -    | 保存图片  输出 svgBase64图片 |

**Events**

| 事件名称          | 说明     | 回调参数                   |
| ------------- | ------ | ---------------------- |
| saveAsDataURI | 保存操作事件 | svgDataUri (svgBase64) |

### Usage

**Plugin**
```
npm i d3 -S
```
**Example**

```
<drawboard :width="960" :height="500" :bgSrc="imgSrc" :controlLayout="controlLayout" :pathOptions='lineOption' @saveAsDataURI="printImage">
</drawboard>
```

```
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
      imgSrc: '',  // 此处为Base64图片码流
      printSrc: ''  // 输出图片显示
    }
  },
  methods: {
    printImage (svgUri) {
      this.printSrc = svgUri
    }
  }
}
```