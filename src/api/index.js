import axios from 'axios'
// import i18n from '@/i18n'
import {Notification} from 'element-ui'
// import {  } from 'element-ui'

const http = axios.create({
  timeout: 10000,
  withCredentials: false,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// 添加响应拦截器
http.interceptors.request.use(function (config) {
  config.mask = false
  config.url += '?t=' + Date.now()

  // if (config.mask) {
  //   Loading.service({ fullscreen: true })
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Response
http.interceptors.response.use(function (response) {
  // 错误统一处理
  if (response.data.ret * 1 !== 0) {
    if (response.data.msg) {
      Notification.error({
        message: response.data.msg
      })
    } else {
      Notification.error({
        message: '请求返回异常'
      })
    }
    return Promise.reject(response.data.ret)
  }

  // setTimeout(() => {
  //   Loading.service().close()
  // }, 3000)

  return Promise.resolve({
    message: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  // Response Error
  Notification.error({
    message: '系统错误'
  })
  return Promise.reject(error)
})

export default http
