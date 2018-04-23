import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './zh_CN/index'
import en from './en_US/index'
import elementLocale from 'element-ui/lib/locale'
// import http from '@/api/index'  // 后期服务端数据 国际化接口调用

Vue.use(VueI18n)

// const currentLocale = 'zh_CN'
/* const language = (currentLocale) => {
  // let resLocale = 'zh_CN'
  // <TODO> 根据接口判断当前语言环境

  return 'resLocale'
} */

const i18n = new VueI18n({
  locale: 'zh_CN',    // 语言标识
  messages: {
    'zh_CN': cn,   // 中文语言包
    'en_US': en    // 英文语言包
  }
})

elementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
