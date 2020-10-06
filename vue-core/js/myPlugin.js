(function(w){
    // 一个Vue的插件本质上是一个对象

    // 1.首先要先定义一个对象
    let MyPlugin = {}

    // let vm = new Vue

    // 对象里边要有install方法
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或属性  myGlobalMethod这个方法是给Vue添加的方法 vm不能用
        Vue.myGlobalMethod = function () {
          console.log('myGlobalMethod全局方法调用了，切记实例不能直接使用，是Vue的方法')
        }
      
        // 2. 添加一个全局资源(asset)  定义全局指令
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // 一些逻辑……
            el.innerText = binding.value.toUpperCase()
          }
        })
      
        // 4. 添加一个实例方法  给Vue的原型添加的,原型上的方法是给实例化对象用的,是给vm实例用的 Vue不能用  
        Vue.prototype.$myMethod = function (methodOptions) {
          console.log('$myMethod实例方法调用了，切记Vue不能直接使用，是V实例化对象的方法')
        }
      }

    //   把这个对象给暴露出去
    w.MyPlugin = MyPlugin 
})(window);//IIFE