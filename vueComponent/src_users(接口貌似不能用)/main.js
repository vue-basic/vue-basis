import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false //页面上的提示信息被禁止

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#root',
  render: h => h(App)
})