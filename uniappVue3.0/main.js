import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import customRouter from './utils/custom-router'
// 引入状态管理
import { setupStore } from '@/stores'

export function createApp() {
  const app = createSSRApp(App)
  app.use(setupStore)
  app.provide('customRouter', customRouter)
  return {
    app
  }
}
// #endif