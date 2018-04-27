import axios from 'axios'
import i18n from '@/i18n'
import { Notification } from 'element-ui'

const http = axios.create({
  timeout: 10000,
  withCredentials: false,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// 添加响应拦截器
http.interceptors.request.use(function (config) {
  // 配置发送请求的信息
  // 在发送请求之前做某事
  config.url += '?t=' + Date.now()
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// Response
http.interceptors.response.use(function (response) {
  // 错误统一处理
  if (response.data.ret * 1 !== 0) {
    if (response.data.msg) {
      Notification.error({
        message: i18n.t(response.data.msg)
      })
    } else {
      Notification.error({
        message: '系统错误'
      })
    }
    return Promise.reject(response.data.ret)
  }

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
