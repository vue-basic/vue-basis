// import indexCss from './public/css/index.css'
// import imgSrc from './public/images/timg.jpg'

// let pp = document.createElement('p')
// pp.innerHTML = '我爱你赵丽颖'
// document.body.appendChild(pp)

// const myFunc = () => {
//     console.log('haha')
// }

// // 创建一个img的标签
// let imgNode = new Image()
// imgNode.src = imgSrc

// // 把imgNode添加到body后面去
// document.body.appendChild(imgNode)

// import Vue from 'vue/dist/vue.esm.js'//带解析器的vue
 import Vue from 'vue'
//  1.导入App
 import App from './App.vue'
 // 一定要加 .vue 不然会报错

 new Vue({
     el:'#root',
    //  render:function(createElement){
    //      return createElement(App)
    //  }


     render: h => h(App) //注册我们的App组件,并且会把App组件进行渲染,并且是 runtime-only 版本的vue可以使用
      //箭头函数 h是函数 render是对象的方法 

     /**
      * ES6的写法:
      *  render: h => h(App) //注册我们的App组件,并且会把App组件进行渲染,并且是 runtime-only 版本的vue可以使用
      //箭头函数 h是函数 render是对象的方法

      * ES5的写法
      * render:function(h){
      *     return h(App)
      * }
      */

    //  2.注册App
    //  components:{
    //      App
    //  },
    //  template:'<App/>' //就是vue渲染的模板,之前我们写在挂载点下边，现在我们换了个地方去写

 })