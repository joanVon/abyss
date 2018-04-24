import Guide from './index'
import UpdateInfo from './updateProject'

export default [
  {
    path: '/guide',
    name: 'Guide',
    component: Guide
  }, {
    path: '/guide/info',
    name: 'UpdateInfo',
    component: UpdateInfo
  }, {
    path: '/guide/info/:id',
    name: 'UpdateInfo',
    component: UpdateInfo
  }]
