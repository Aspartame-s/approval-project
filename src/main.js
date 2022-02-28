import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/common.css'
import components from '@/components/components.js'
import BaiduMap from 'vue-baidu-map'
import global from '@/components/Global'
import store from './store'
Vue.prototype.GLOBAL = global
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'rqZVHGWqPdFgW9TPyM8zbSwRGWjp6bS1'
})
Vue.use(components)
Vue.config.productionTip = false
import { XInput, Group, Swiper, Tab, TabItem, XAddress, Rater, Cell } from 'vux'
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('swiper', Swiper)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-address', XAddress)
Vue.component('rater', Rater)
Vue.component('cell', Cell)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
