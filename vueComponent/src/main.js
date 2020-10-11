import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false //页面上的提示信息被禁止

// Vue.prototype.$bus = new Vue() 
// new Vue()实例化了一个Vue的实例化对象
// 因为只有组件对象或者Vue的实例化对象才能调用$on和$emit

// 想要成为事件总线的条件:
// 1.所有的组件对象必须都能看到这个总线对象,因此我们把这个对象放到了Vue的原型上
// 2.这个事件总线对象必须能调用$on和$emit方法(总线对象必须是Vue的实例化对象或者是组件对象)
// $on和$emit也在Vue的原型上

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#root',
  render: h => h(App)
})