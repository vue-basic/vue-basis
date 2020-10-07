import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false //页面上的提示信息被禁止

new Vue({
  el:'#root',
  render: h => h(App)
})