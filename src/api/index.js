import axios from 'axios'
import i18n from '@/i18n'
import { Notification } from 'hui'

const http = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

// Response
http.interceptors.response.use(function (res) {
  // 错误统一处理
  if (res.data.code * 1 !== 0) {
    if (res.data.message) {
      Notification.error({
        message: i18n.t(res.data.message)
      })
    }
    return Promise.reject(res.data.code)
  }

  return Promise.resolve({
    message: res.data.message,
    data: res.data.data
  })
}, function (error) {
  // Response Error
  return Promise.reject(error)
})
