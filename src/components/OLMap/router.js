import DataShow from './dataShow/index'
import SetPoint from './setPoint/index'
import SetArea from './setArea/index'
import SetPicLayer from './setPicLayer/index'
import MapSet from './mapSet/index'
import mapLayer from './mapLayer/index'
import mapLib from './mapLib/index'
import MMap from './mMap/index'
export default [
  {
    path: '/ibMap',
    redirect: '/ibMap/dataShow'
  },
  {
    path: '/ibMap/dataShow',
    name: 'DataShow',
    component: DataShow
  },
  {
    path: '/ibMap/setPoint',
    name: 'SetPoint',
    component: SetPoint
  },
  {
    path: '/ibMap/setArea',
    name: 'SetArea',
    component: SetArea
  },
  {
    path: '/ibMap/setPicLayer',
    name: 'SetPicLayer',
    component: SetPicLayer
  },
  {
    path: '/ibMap/mapSet',
    name: 'mapSet',
    component: MapSet
  },
  {
    path: '/ibMap/mapLayer',
    name: 'mapLayer',
    component: mapLayer
  },
  {
    path: '/ibMap/mapLib',
    name: 'mapLib',
    component: mapLib
  }, {
    path: '/ibMap/mMap',
    name: 'MMap',
    component: MMap
  }
]
