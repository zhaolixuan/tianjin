import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import '../src/assets/css/vantui.css'
import '../src/assets/css/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element.css'
import VCharts from 'v-charts'
import echarts from 'echarts'
import './utils/chart.resize.js'
import Vconsole from 'vconsole'
import { Base64 } from 'js-base64'
import NavigatorApi from '@/utils/navigator';
const android = window.android
export { android }
import vueEsign from 'vue-esign'
Vue.use(vueEsign)
import vueToPdf from '@/utils/vueToPdf.js'
Vue.use(vueToPdf)
// let vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(Vant)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$Base64 = Base64;



window.navigatorApi = new NavigatorApi()
window.navigatorApi.getCurrentPosition()
window.navigatorApi.watchPosition()

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')