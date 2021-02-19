import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.prototype.$http=axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/reset.css'

import local from './utils/local' //本地缓存函数

import CKEditor from '@ckeditor/ckeditor5-vue'; //富文本编辑
Vue.use(CKEditor);

Vue.use(ElementUI)
Vue.config.productionTip = false

/* 中央事件总线 */
const bus = new Vue()
Vue.prototype.$bus = bus

/* 
this.$bus.$emit('事件名','参数')   -- 传值
this.$bus.$on('事件名',(res) => {} )   -- 接收
*/



// 高德地图
import AMap from 'vue-amap';
Vue.use(AMap);

  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'ac3e2dec66981128d50aa7c987d8d32e',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.Marker',
	'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation','AMap.Geocoder']
});

import './assets/font_2004442_xxwh3rsiaf/iconfont.css'

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
