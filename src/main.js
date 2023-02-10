import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import iconfont from './assets/iconfont/iconfont.css'
import './utils/rem'
import store from './store'
import ElementUI from 'element-ui'
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/index.css"
import vuescroll from 'vuescroll'
import $ from 'jquery'
import 'video.js/dist/video-js.css'

// 2021年12月24日新增v-charts
import VCharts from 'v-charts';
Vue.use(VCharts);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts // 全局引入echarts，调用时通过 this.$echarts 调用
Vue.use(ElementUI)
Vue.use(animated)
Vue.use(vuescroll)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  iconfont,
  components: { App },
  template: '<App/>'
})
