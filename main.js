
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from  '@/store/store.js'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'


uni.$http=$http
$http.baseUrl='https://www.lyalice.top/api'

$http.beforeRequest=function(option){
	uni.showLoading({
		title:'数据加载中'
	})
	
}
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}



$http.afterRequest = function () {
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif