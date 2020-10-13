## 1.dependencies | devDependencies
* dependencies : 运行时依赖
* devDependencies :开发依赖

## 2.配置webpack --- webpack.config.js
```
// 引入path
const path = require('path')
module.exports = {
    // 入口
    entry:'./src/main.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        // __dirname 当前文件所在的目录名,并且是绝对路径  在设置出口的目录路径
        filename: 'main.js'
      },
    //   loader
    module: {
        rules: [
        //   配置各种loader
        ]
      },
    //   插件 plugins
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
      ],
};

```
### 1.两个插件
*  1.配置插件html-webpack-plugin打包连带html文件
```
1.var HtmlWebpackPlugin = require('html-webpack-plugin'); //构造函数

2.plugins: [
      new HtmlWebpackPlugin(),
      ],

```

* npm install --save-dev clean-webpack-plugin 
* --sava-dev === -D

* 2.每次运行webpack  dist内部不会自动清除，那么我们需要安装插件自动清除dist, clean-webpack-plugin
```
1.const { CleanWebpackPlugin } = require('clean-webpack-plugin');

2.plugins: [
      new CleanWebpackPlugin()
      ],
```

## 3.安装babel-loader
```
babel-loader
1.解析ES6 --- ES5
2.认识import和export

babel-loader本身并不能解析ES6 ---> ES5,它靠的是core和preset-env,在core的内部有很多解析ES6的语法/模块
preset-env 里边引入了很多的包
babel/preset-env 把所有的模块放到一个大包里边

```
* npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env

## 4.打包css文件 需要两个loader
* css-loader  
* style-loader
```
1.在public文件夹下创建一个文件夹css,在css文件夹中新建一个文件index.css
2.在index.css中写入样式
    body{
      background-color: hotpink;
    }

3.在main.js中引入index.css
    import indexCss from './public/css/index.css'

4.安装css-loader style-loader 
  npm install --save-dev css-loader
  npm install style-loader --save-dev

5.在webpack.config.js中配置
  // 解析css
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }

6. npm run start
  页面变成hotpink
```

## 5.打包图片文件  file-loader  url-loader
```
1.安装
npm install --save-dev file-loader
npm install --save-dev url-loader

2.在webpack.config.js
 // 解析图片
    {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader', //url-loader内部会用到file-loader 不需要配置file-loader  图片、视频时二进制文件 url-loader用来解析媒体文件
            options: {
              limit: 8192  //小于8kb的图片转化为base64字符串代替,为了减少请求次数
            }
            
          }
        ]
      }

3.在public下边创建一个文件夹images,在images下放一张图片 timg.jpg

4.在main.js中导入才能使用
  import imgSrc from './public/images/timg.jpg'

  // 创建一个img的标签
  let imgNode = new Image()
  imgNode.src = imgSrc

  // 把imgNode添加到body后面去
  document.body.appendChild(imgNode)

```

## 6.webpack-dev-server
```
webpack.config.js
1.npm install webpack-dev-server -D

2.// 基础配置
  devServer: {
    port: 9000 , //端口
    open:true,//自动打开浏览器
    quiet:true,//log日志
  }

3.package.json
   "scripts": {
      "start": "webpack --mode development",
      "dev":"webpack-dev-server --mode development"
  },

4.
npm run start 会生成dist文件夹
npm run dev 用webpack-dev-server去跑的,它跑在服务器上,运行在内存里边,不会生成dist文件夹

5.
每次更改代码都要去重新打包，那么我们可以使用开发服务器插件自动打包 webpack-dev-server，
但是修改webpack配置还是要重新启动

6.webpack.config.js
 devtool:'cheap-module-eval-source-map'
```

# day04
## 1.基本步骤

```
1.创建components文件夹,在内部去定义MyButton组件
2.在src内部创建App组件用来组装以后所有的组件
3.在Vue当中去注册App组件并且进行渲染
```

```
1.在src里边创建一个文件夹 components
2.在components里边新建一个文件 MyButton.vue
3.在src下创建文件 App.vue
```


## 2.MyButton.vue 定义组件---定义配置对象
```
<template>
    <div>
        <button @click="count++">点击了{{count}}次</button>
        <h2>我爱你赵丽颖</h2>
    </div>
</template>

<script>
export default {
    name:'MyButton',
    data() {
        return {
            count:0
        }
    },
}
</script>

<style lang="less" scoped>
// scoped 当组件如果多的时候,如果不加scoped,会影响其他的组件
// 加了scoped 只会影响本组件的h2,不会影响其他的组件
    h2{
        color: hotpink;
    }
</style>

```

* 将组件合并到App中

## 3.App.vue
```
<template>
  <div>
    <!-- 3.使用 -->
    <MyButton></MyButton>
    <MyButton></MyButton>
    <MyButton></MyButton>
  </div>
</template>

<script>
// 1.引入
import MyButton from "./components/MyButton";

export default {
  name: "App",
  //2. 注册
  components: {
    MyButton,
  },
};

</script>

<style> 
<!-- lang="less" 一定不要加 加了后期会报错 -->
</style>
```
* App 需要靠Vue渲染

## 4.安装Vue (必须装)
* npm install vue -S

* App也是一个大的组件

## 5.main.js
```
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

 import Vue from 'vue'
//  1.导入App
 import App from './App.vue'
 // 一定要加 .vue 不然会报错

 new Vue({
     el:'#root',
    //  2.注册App
     components:{
         App
     },
     template:'<App/>' //就是vue渲染的模板,之前我们写在挂载点下边，现在我们换了个地方去写

 })
```
## 6.index.html中创建挂载点
```
<div id="root></div>
```

## 2.基本步骤
```
配置vue-loader
1.安装
2.配置loader
3.配置插件 插件不需要下载 安装了vue-loader 里面会带
4.把原来的style-loader 改为 vue-style-loader

```

## 7.安装loader
* npm install -D vue-loader vue-template-compiler
```
1.在webpack.config.js中配置
  const VueLoaderPlugin = require('vue-loader/lib/plugin')

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }

       new VueLoaderPlugin()

将 'style-loader' 替换成 'vue-style-loader' 
```

```
// scoped 当组件如果多的时候,如果不加scoped,会影响其他的组件
// 加了scoped 只会影响本组件的h2,不会影响其他的组件
```

## 8.报错
```
1.[Vue warn]: Cannot find element: #root
原因:我们的插件 hemlwebpackplugin 没有告诉vue配套的html是谁,得在webpack配置文件实例化这个插件对象的时候,添加配置
解决:在webpack.config.js中的plugin中设置
  new HtmlWebpackPlugin({
      template:'./src/public/index.html'
    }),//加一个配置对象让vue可以找到对应的模板挂载点 ,本质就是让vue去找对应的html文件

2.[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
原因:因为而欧美让你默认导入的vue是不带解析器的版本,所以我们自己注册和配置的模板没办法去解析
解决:
1.不用自己写注册和template,使用下面的render函数去做
 render: h => h(App) //注册我们的App组件,并且会把App组件进行渲染,并且是 runtime-only 版本的vue可以使用
      //箭头函数 h是函数 render是对象的方法
 //内部会带着解析的功能
  
2.
ES5的写法
      * render:function(h){
      *     return h(App)
      * }

3.  render:function(createElement){
         return createElement(App)
    }

<!-- 使用自己写的注册和template配置,把vue导入的版本修改 -->
4.把导入的vue改为不是runtime-only版本
import Vue from 'vue/dist/vue.esm.js'//带解析器的vue

 //  2.注册App
     components:{
         App
     },
     template:'<App/>' //就是vue渲染的模板,之前我们写在挂载点下边，现在我们换了个地方去写

3. Refused to apply style from 'http://localhost:9000/css/bootstrap.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.


```

## 9.resove(解析)
```
1.resolve
导入组件时不加后缀名.vue会报错的解决方法,在webpack.config.js中配置resolve
 resolve:{
    extensions: [".js", ".json",".vue"]
  }

2.alias 自动解析包含的扩展名文件 以后导入不用带扩展名
resolve: {
    extensions: [".js", ".json", ".vue"],
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, 'src') //这个别名代表以后@就是src的绝对路径
    }
  },

  引入时就可以用@
  import MyButton from '@/components/MyButton'

```



## 10.删文件
* 1.components里边的 MyButton.vue ×
* 2.public中的 css/images ×
* 3.App.vue中的内容删了重新写

## 11. main.js
```
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
```

# 12.comment组件化开发（案例）
## 1.comment_page
### 1.静态页面实现：
* 1.拆分组件(拆分页面 定义组件) 能细则细,最大化重用
```
组件命名规则: 1.按功能 2.按位置

最外边一定是一个组件 App.vue
  左侧功能 --- 添加评论  拆成组件 Add.vue
  右侧列表功能---列举所有评论 拆成组件 List.vue
      每一项评论  Item.vue

```

```
components文件夹下创建文件
  Add.vue
  List.vue
  Item.vue

src文件夹下创建文件
  App.vue

public文件夹下创建文件夹 css 
把bootstrap.css放到css中
在index.html中引入
<link rel="stylesheet"  href="./css/bootstrap.css">

```

* 2.组装组件
```
1.App.vue中
引入
import Add from '@/components/Add'
import List from '@/components/List'
注册
components:{
    Add,
    List
  }
使用
<Add></Add>
<List></List>

2.List.vue中
引入
import Item from '@/components/Item'
注册
components:{
      Item
  }
使用
 <Item></Item>

```
* 3.渲染组件---main.js
```
import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false //页面上的提示信息被禁止

new Vue({
  el:'#root',
  render: h => h(App)
})
```

```
报错:
Refused to apply style from 'http://localhost:9000/css/bootstrap.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.


```
* 		注意：webpack配置拷贝public下的css文件 "npm install copy-webpack-plugin@5.1.1",

### 2.动态交互实现:
* 动态组件界面
#### 1、初始化数据动态显示
```
1.初始化数据分析：
				数据类型     一般我们的数据最终都是放在一个数组内部，数组内部放对象  [{},,{},{}] 每一个对象代表一个评论信息
				数据名称     comments:[{},{},{}]
				定义在哪个组件   （看哪个组件还是哪些个组件使用到）
					数据用到不是说展示就代表用，而是说数据的增删改查都叫用到数据
					如果这个数据只是某一个组件用的，那么数据就在这一个组件当中定义
					如果这个数据在某些个组件当中用的，那么就找这些个共同的祖先组件去定义

        组件标签名和属性名大小写问题：
				基本规则：要么原样去写，要么转小写中间用-连接
				AddComment       <AddComment/>  或者  <add-comment>
```

* 数据:---App.vue
```
 data() {
    return {
      comments:[
        {id:1,content:'Vue很666',username:'aaa'},
        {id:2,content:'Vue很999',username:'bbb'},
        {id:3,content:'Vue很888',username:'ccc'},
      ]
    } 
  },
```

#### 2、交互（与用户的交互）
* 增删改查
* 查
* 增删改

## 面试必问 --- 组件间通信(组件间如何把数据传过去)
* App组件相当于Add和List组件的爹  
* App组件相当于是Item组件的爷爷
* Add组件相当于是Item组件的叔叔或者伯伯
* List组件相当于是Item组件的爹

* App中的数据 -------> Item中
```
属性传递 
prop:属性
props:可以传递多个属性

父组件当中可以通过属性传值,传递到子组件当中;但是子组件当中必须声明接收,不然没法用

1.在App.vue中 
<List :comments="comments"></List> 
带冒号表示绑定数据 把数据传过去  属性名是自己取的
这样写把comments的数据传到List内部取了

2.在List中
List中接收的时候需要声明接收属性
 props:['comments'] //声明接收父组件传递过来的属性
//   一旦声明接收了,这个comments就相当于在List的data中的数据,也就是说comments是List的数据了

3.遍历item 通过属性传值把数据传给Item
<Item v-for="(comment,index) in comments" :key="comment.id" :comment="comment"></Item>
<!-- Item有几项是由数据决定的 用v-for遍历 再一次传递数据给Item  把 当前遍历的item给Item传过去-->

4.在Item组件中接收
 props:['comment']

 数组使用
  <p class="user">
        <span>{{comment.username}}</span>
        <span>说:</span>
    </p>
  <p class="centence">{{comment.content}}!</p>
```

### 1.props组件间通信  ---- 适用于父子之间
```
props组件间通信 是通过属性传递数据 
只能用于父子之间 一级一级进行传递

props 组件通信的方式：
		props组件通信，只适用于父子组件传递
			父给子传：可以传递函数数据和非函数数据  

        父给子传非函数数据:确实是爹给儿子的数据
        <List :comments="comments"></List> 

        /*
        父给子传的非函数数据
        App中有数据comments,在App中能看到List,然后App把comments通过属性传值传给了它的儿子List,而List在它的内部通过接收属性props   props:['comments','deleteComment'] 可以接收到,那么这个comments在List的内部就可以使用
               <Item v-for="(comment,index) in comments"
                  :key="comment.id"
                  :comment="comment" 
                  :index="index" 
                  :deleteComment="deleteComment"
              ></Item>
        所以说如果爹给儿子传的是非函数数据,那确确实实就是爹给儿子的数据,
        */

        App.vue
        data() {
          return {
            comments:[
              {id:1,content:'Vue很666',username:'aaa'},
              {id:2,content:'Vue很999',username:'bbb'},
              {id:3,content:'Vue很888',username:'ccc'},
            ]
          }
      },

        父给子传函数数据:本质上是爹想要儿子的数据  因为函数定义是在父里边定义的,而调用是在子里边调用的  
        而函数关键看调用 一调用传的实参 这边就接收到了
        <Add :addComment="addComment"></Add>
        <List :comments="comments" :deleteComment="deleteComment"></List>

        methods:{//函数定义 定义不执行
          addComment(comment){
            this.comments.unshift(comment)
          },
          deleteComment(index){
            this.comments.splice(index,1)
          }
        },

        /*
          父给子传的函数数据
          Add.vue

          一点击提交按钮,它就会调addC这个函数,而在addC中 自己封装了个对象,一个新的comment

             // 收集数据形成新的comment对象 v-model
                let {username,content} = this //解构赋值
                  // 验证数据的可靠性
                  if(username.trim()&&content.trim()){
                      let id = Date.now()
                      let comment = {
                          username,
                          content,
                          id
                      }
                  }
                }

          儿子想把comment对象放到爹里边的comments里边去,儿子就要把comment传给爹,怎么传呢?

            最终调的是爹传给它的一个方法 this.addComment(comment)
            我们在App.vue里边定义了一个函数数据
              addComment(comment){
                this.comments.unshift(comment)
              },
            这个函数定义定义在爹里边,父把这个函数数据通过属性传值传给了它的儿子 <Add :addComment="addComment"></Add>
            儿子在Add.vue中接收 <Add :addComment="addComment"></Add>
            接收了以后儿子调用这个函数  this.addComment(comment)

            函数只是个对象,传过来的只是个地址 儿子接收到了地址就相当于拿到了函数
            儿子调的仍是父里边定义的哪个函数

            函数调用:
            父里边有个形参叫comment,子里边有个实参叫comment  
            相当于  把儿子里边创建的新的comment,通过实参传过去,给了父里边的形参 爹就拿到子里边的数据了



        */

        爹把函数传递给儿子 
        儿子调用,调用的时候儿子怎么给爹传递数据? 形参就是数据
        this.addComment(comment)
        this.deleteComment(this.index)

			子给父传：通过调用父传递过来的函数数据，然后通过实际参数给父传数据
		    
		不足（不是父子就很麻烦） 比如爷孙关系 父--》子--》孙  |  兄弟关系，就必须先把一个数据给了父亲，然后通过父亲再给另一个

		最基础的通信，用的也是比较多的，所以必须搞定
```
### 2.自定义事件 ---- 只适用于子向父通信
```
只适用于:子向父通信
原因:因为父组件内部可以看到子组件对象,可以给子组件对象绑定事件,回调函数在父组件定义

为什么父可以给子绑定事件?
因为在父里可以看到子
为什么子不可以给父绑定事件?
因为在子里看不到父

子所调的父中的函数都是在子向父通信
父给子一个函数目的就是想要子的数据
子调父中的函数相当于通过实参给父传东西  子向父传数据

做法：在父组件当中可以看到子组件对象，给子组件对象绑定自定义事件$on  回调函数在父组件中

	      在子组件当中，我们需要传递数据的地方，去触发自己身上的事件$emit，调用回调函数中传参给父

  接受数据的组件(父)必须能看到预绑定事件(子)的组件对象，才能绑定 $on()
	发送数据的组件(子)必须能看到绑定了事件(子)的组件对象，才能触发事件  $emit()

  $on //绑定事件
  $emit()  分发/触发事件
  本质上也是通过传参给我们传数据

  $off() //解绑事件 在你需要销毁实例的时候,我们可以善后处理一下
  $once() //绑定的时候只能触发一次
```
* [1].自定义事件的第一种写法----本质
```
例子:
在App.vue这个父组件中可以看到Header这个子组件对象,这样就可以给子组件对象绑定事件
绑定事件属于异步操作

1.在App中可以看到Header
<Header :addTodo="addTodo" ref="header"></Header> 

2.给Header绑定事件
在mounted中挂载
 // 当你的页面一旦挂载ok,那我就获取这个组件对象,怎么获取?ref
 
 mounted() {
  // 当你的页面一旦挂载ok,那我就获取这个组件对象,怎么获取?ref
  // this.$refs.header 代表Header组件对象 这个组件对象身上有一个方法,这个方法其实是在Vue的原型身上 $on
  // $on在谁后边点的就相当于在谁身上加了自定义事件
  // 自定义事件分为两部分:事件名(事件类型)和回调函数 
  // 回调在谁里边，谁一定是接收数据的
  this.$refs.header.$on('addTodo',this.addTodo)
},

在Header子身上绑定了一个事件,名字叫addTodo,然后回调时放在App父组件的

4.addTodo这个回调函数留在父组件App中
 addTodo(todo){
      this.todos.unshift(todo)
    },

5.子调父中的函数
 this.$emit('addTodo',todo)//触发/调用事件

6.$off解绑自定义事件  ---不需要写
beforeDestroy(){
  this.$refs.header.$off('addTodo')//解绑儿子身上自定义事件
},
```

* 自定义事件第二个写法
```
1.在子组件对象身上绑定一个事件
      <Header @addTodo="addTodo" ></Header> 

2.父定义
 addTodo(todo){
      this.todos.unshift(todo)
    },

3.子调用

```

```
 /*
          父给子传的函数数据
          Add.vue

          一点击提交按钮,它就会调addC这个函数,而在addC中 自己封装了个对象,一个新的comment

             // 收集数据形成新的comment对象 v-model
                let {username,content} = this //解构赋值
                  // 验证数据的可靠性
                  if(username.trim()&&content.trim()){
                      let id = Date.now()
                      let comment = {
                          username,
                          content,
                          id
                      }
                  }
                }

          儿子想把comment对象放到爹里边的comments里边去,儿子就要把comment传给爹,怎么传呢?

            最终调的是爹传给它的一个方法 this.addComment(comment)
            我们在App.vue里边定义了一个函数数据
              addComment(comment){
                this.comments.unshift(comment)
              },
            这个函数定义定义在爹里边,父把这个函数数据通过属性传值传给了它的儿子 <Add :addComment="addComment"></Add>
            儿子在Add.vue中接收 <Add :addComment="addComment"></Add>
            接收了以后儿子调用这个函数  this.addComment(comment)

            函数只是个对象,传过来的只是个地址 儿子接收到了地址就相当于拿到了函数
            儿子调的仍是父里边定义的哪个函数

            函数调用:
            父里边有个形参叫comment,子里边有个实参叫comment  
            相当于  把儿子里边创建的新的comment,通过实参传过去,给了父里边的形参 爹就拿到子里边的数据了



        */
```

### 3.全局事件总线  ---- 适用于任何组件
组件间关系
* 父子
* 兄弟
* 其他
```
适用于任何组件
借助于自定义事件的

找一个中间人，而这个中间人能被所有的组件看得到
在Vue中怎么能被所有的组件看的到？ 
GlobalEventBus ---- 全局事件总线(本质上就是一个对象)  
两个条件:
1.所有的组件对象必须都能够看到它(找到它)   ---- 把bus对象放到原型里边就可以拿到
2.这个事件总线对象必须可以使用$on和$emit()方法去绑定和触发事件

B给A传数据 ？ A想要给B绑定事件 假设AB为父子关系,用自定义事件就可以了,但是现在AB为兄弟组件，A看不到B,无法给B绑定事件,但是A和B都能看到bus,
在A组件内部找到bus,并给bus绑定事件,回调函数留在A组件内部的
B想要给A中传数据,没法直接传。但是B组件内部也是可以看到bus的,所以B先找到bus,触发bus身上绑定的事件,并且由于在B组件内部找到的bus,所以可以在B组件内部传数据

实现方式:
A组件可以找到bus,在bus身上进行绑定事件$on,回调函数留在A组件里,代表时用来接收数据 ------  回调函数在谁内部,谁就是接收数据的
B组件可以找到bus,这样B就可以看到bus身上绑定的事件,B触发$emit bus身上绑定的事件
因为是在B组件内部找到bus去触发它身上的事件的,所以可以在B组件内部传数据  

其实是以中间的bus为桥梁  事件绑定在bus身上 数据传到bus身上,只不过回调函数留在了A中,所以在A中可以拿到数据
只是把事件绑定在bus身上 仅此而已


为什么GlobalEventBus必须要可以使用$on和$emit呢？
如果不能用$on和$emit ， 它怎么能它自己身上绑定事件呢
this.$on $on在谁的后边就是给谁绑定事件
this.$refs.header.$on  给Header组件绑定事件
谁点的$on 就是给谁绑定事件

GlobalEventBus这个对象必须放到原型里边才能够被所有的组件对象都能找到

Vue.prototype.$bus = new Vue() 
// new Vue()实例化了一个Vue的实例化对象
// 因为只有组件对象或者Vue的实例化对象才能调用$on和$emit

// 想要成为事件总线的条件:
// 1.所有的组件对象必须都能看到这个总线对象,因此我们把这个对象放到了Vue的原型上
// 2.这个事件总线对象必须能调用$on和$emit方法(总线对象必须是Vue的实例化对象或者是组件对象)
// $on和$emit也在Vue的原型上

可以让当前的vm作为总线,不需要再额外开辟空间
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#root',
  render: h => h(App)
})


```

![](D:\a-尚硅谷-前端\01尚硅谷前端\视频\16-刘渊vue\1-vue基础\vue基础\vue-liuyuan-code\vueComponent\全局事件总线原理图.png)
 

 ```
 全局事件总线适用于任何场景
 1.
  Vue.prototype.$bus = new Vue() 

 2.App接收数据 --- $on
 mounted() {
  // 在A组件内部找到bus,因为bus是一个vm对象,所以它可以找到$on,$on是把事件绑定在谁身上
  // 把事件绑定在bus身上 时间名:updateOne 回调函数updateOne
  // 回调函数留在了A组件中
  this.$bus.$on('updateOne',this.updateOne)
},

3.绑定好这个事件之后就不需要传了，也不需要接收了

4.在B组件中触发bus身上的事件  --- 发送数据的一方,触发$bus身上的事件
 this.$bus.$emit('updateOne',this.index)
 ```  

### 4.消息订阅与发布  PubSub ---- PubSubJS
```
1.安装
npm install pubsub-js

2.导入
import PubSub from 'pubsub-js'

3.谁想要接收数据就在谁内部订阅,这个回调函数就在谁里边
var token = PubSub.subscribe('MY TOPIC', function (msg, data) {
    console.log( msg, data );
});

4.谁发送数据谁就发布数据
PubSub.publish('MY TOPIC', 'hello world!');
PubSub.publishSync('MY TOPIC', 'hello world!');
```







### 5.插槽slot
* 1.默认插槽
```
slot 如果没有起名字,称作默认插槽,它会把父组件中你写的东西,在slot中都来一份
<slot>
  <!-- 占位置,这里面的内容以及这里面的结构不确定,得由父组件给我传 -->
</slot>

一般我们在用的时候,默认插槽只有一个
```
* 2.命名插槽/具名插槽
```
子：
<slot name="btn">

</slot>

父：
<template slot="btn">
        <h2>我爱你</h2>
</template>
```
* 3.作用域插槽  子----》父
```
数据在子组件中,结构由父组件决定
结构是父组件决定的 数据是子组件中的 但是展示的结构是由外部的父组件决定的

 什么时候用作用域插槽？
 当碰到数据是在子组件当中展示的,而结构是由父组件决定的,此时必然使用作用域插槽
```
* 父
```
<Child2 :todos="todos">
      <!-- 决定子组件内部的结构，比如假设isOver为true,那么内容需要包含在span当中并且内容前面带√ -->
      <!-- slot-scope会把子组件传递过来的数据，放在一个对象当中作为属性 -->
      <!-- 什么时候用作用域插槽： 当碰到数据是在子组件当中展示的，而结构是由父组件决定的，此时必然使用作用域插槽 -->
      <template slot-scope="scopePerps">
        <span v-if="scopePerps.todo.isOver">
          √
        </span>
        {{scopePerps.todo.content}}
      </template>
</Child2>
```
* 子
```
<ul>
            <li v-for="(todo,index) in todos" :key="todo.id" >
                <slot :todo="todo" >
                    <!--  
                        可以通过作用域插槽,把当前的数据传到父中,和属性传值一样
                        :todo="todo" 是作用域插槽的一部分,会传递给父组件当中某个固定的区域
                        数据在子组件当中,结构由父组件决定
                     -->
                     {{todo.content}}
                </slot>
            </li>
 </ul>
```

### 2.增加评论的功能 Add.vue
* 最终要点击提交按钮 添加事件 @click="addC"

```
1.收集数据Add.vue
        <input type="text" class="form-control" placeholder="用户名" v-model="username" />
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="content"
        ></textarea>

   data() {//data当中放的是初始化数据和要收集的数据 
      return {//对象书无序的
          username:'',
          content:'',
      }
```
```
在Add.vue中
methods:{
      addC(){
        // 点击提交,要执行的回调函数

        // 收集数据形成新的comment对象 v-model
        let {username,content} = this //解构赋值
        // 验证数据的可靠性
        if(username.trim()&&content.trim()){
            let id = Date.now()
            let comment = {
                username,
                content,
                id
            }

        // 把新的comment对象添加到我们的comments数组当中
        // 数据在哪定义,更新数据的方法就应该在哪定义,而其他组件想要去修改数据,必须调用更新数据的方法去做
        // 在Add里边想要去修改App里边的数据 ,数据是定义在App里边的,那么真正修改App数据的方法就应该定义在App里边
        } 
      }
  }
```

```
// 数据在哪定义,更新数据的方法就应该在哪定义,而其他组件想要去修改数据,必须调用更新数据的方法去做
// 在Add里边想要去修改App里边的数据 ,数据是定义在App里边的,那么真正修改App数据的方法就应该定义在App里边
在App.vue中
 methods:{
    addComment(comment){
      this.comments.unshift(comment)
    }
  },

  <Add :addComment="addComment"></Add>
  传过去的是一个函数数据

  在Add里边声明接收
  props:['addComment'],

  methods里边
  调用方法去改数据
        this.addComment(comment)

         methods:{
          addC(){
            // 点击提交,要执行的回调函数

            // 收集数据形成新的comment对象 v-model
            let {username,content} = this //解构赋值
            // 验证数据的可靠性
            if(username.trim()&&content.trim()){
                let id = Date.now()
                let comment = {
                    username,
                    content,
                    id
                }
            // 把新的comment对象添加到我们的comments数组当中
            // 数据在哪定义,更新数据的方法就应该在哪定义,而其他组件想要去修改数据,必须调用更新数据的方法去做
            // 在Add里边想要去修改App里边的数据 ,数据是定义在App里边的,那么真正修改App数据的方法就应该定义在App里边
            this.addComment(comment)
        } 
      }
  }

```

## 3.删除评论的功能  Item.vue
```
1.Item.vue
<a href="javascript:;"  @click="deleteC">删除</a>

点哪个删哪个 在数组中删拿的是下标 index 
所以 List.vue 需要把 index 传给 Item
<Item v-for="(comment,index) in comments" :key="comment.id" :comment="comment" :index="index"></Item>

Item.vue
 props:['comment','index'],

删的时候 动数据 必须调用数据所在地方的删除方法

在App.vue中定义删除评论的方法
 deleteComment(index){
      this.comments.splice(index,1)
    }

有了这个方法要先给List.vue传过去
 <List :comments="comments" :deleteComment="deleteComment"></List>

List.vue要接收
props:['comments','deleteComment'] 

List.vue把这个方法传给Item.vue
<Item v-for="(comment,index) in comments"
          :key="comment.id"
          :comment="comment" 
          :index="index" 
          :deleteComment="deleteComment"
          ></Item>

Item.vue中接收
props:['comment','index','deleteComment'],

使用:
methods:{
      deleteC(){
        //  点哪个删哪个 在数组中删拿的是下标 index 

        // 删的时候 动数据 必须调用数据所在地方的删除方法
        this.deleteComment(this.index)
      }
  }

```

# 13.todoList组件化开发（案例）
## 2.todos_pages
### 1.静态页面  
* 命名按位置
* 1、拆分页面 定义组件 components
```
      上 Header.vue
      中 Main.vue
        里 Item.vue
      下 Footer.vue
```

* 2、将组件组装到App当中
```
1.引入
App.vue
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

Main.vue
import Item from '@/components/Item'

2.注册
App.vue
components:{
    Header,
    Main,
    Footer
  }

  Main.vue
  components:{
      Item
  }

3.使用
App.vue
      <Header></Header>
      <Main></Main>
      <Footer></Footer>

Main.vue
<Item></Item>
```
* 3、渲染组件实现静态页面
```
main.js

import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false //页面上的提示信息被禁止

new Vue({
  el:'#root',
  render: h => h(App)
})
```
### 2.动态页面
```
1.数据定义在App.vue中
定义一个标志
  <input type="checkbox" :checked="todo.isOver"/>

data() {
    return {
      todos:[
        {id:1,content:'抽烟',isOver:false},
        {id:2,content:'喝酒',isOver:true},
        {id:3,content:'烫头',isOver:false}
      ]
    }
  },

2.把数据传给Main.vue
 <Main :todos="todos"></Main>

3.在Main.vue中接收
 props:{
    todos:Array
  }

4.遍历 并把数据传给Item
 <Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo"></Item>

5.在Item中接收数据
 props:{
    todo:Object
  }

6.在Item中展示数据
 <span>{{todo.content}}</span>
```

* 用户交互

### Header.vue
```
1.在Header.vue中添加事件
<input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="addT" v-model="content"/>
v-model="content" 而content只是它自己内部收集,所以要放在它自己里边

2.在App.vue中给Header.vue传入addTodo这个函数
<Header :addTodo="addTodo"></Header>

addTodo这个函数一定是在App.vue中定义的
 methods:{
    addTodo(todo){
      this.todos.unshift(todo)
    }
  },

3.在Header.vue中接收addTodo
 props:{
    addTodo:Function
  },

4.在Header.vue中调用
this.addTodo(todo)

5.addT事件
methods:{
    addT(){
      let {content} = this
      if(content.trim()){
        let id = Date.now()
        let isOver = false
        let todo = {
          id,
          isOver,
          content
        }

        // 去调用App组件内部的增加数据的方法去添加,不能再这直接去操作别人的数据

        this.addTodo(todo)
      }else{
        alert('请输入合法内容')
      }
      this.content = ''
    }
  }
```
### 3.Item.vue
```
6.在Item.vue中 
  1.
    <button class="btn btn-danger" style="display:none">删除</button>
    删掉 style="display:none" ×

  2.在css中
    li button里的display: none; 删除 ×

  3.在Item中 使用v-show实现删除按钮的显示与隐藏
  <button class="btn btn-danger" v-show="isShow">删除</button>

  4.isShow在Item中定义
  data() {
    return {
      isShow:false
    }
  },

 5.对li添加移入移出事件
  <li @mouseenter="isShow = true" @mouseleave="isShow = false">

6.在Item中定义一个类
myClass
 <li @mouseenter="isShow = true" @mouseleave="isShow = false" :class="{myClass:isShow}">
 知道有哪些类 但是不知道生不生效 而生不生效是根据数据决定的 这个数据必须是个布尔值

7.Item.vue
点击checkbox 绑定一个事件 updateO

8.App.vue
修改数据的函数定义在App.vue中
methods:{
    updateO(){
      // 改数据 交给App.vue去做
      this.todos[index].isOver = !this.todos[index].isOver
    }
  }

9.App.vue把updateOne函数传给Main.vue 
<Main :todos="todos" :updateOne="updateOne"></Main>

10.函数在Main.vue中接收updateOne函数
  props:{
    todos:Array,
    updateOne:Function
  }

11.Main.vue把updateOne传给Item 同时把下标index也传过去 因为一会要用
在Main.vue中 
<Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo" :updateOne="updateOne" :index="index"></Item>

11.在Item.vue中接收
props:{
    todo:Object,
    updateOne:Funtion,
    index:Number
  },

  12.在Item.vue中调用updateO函数
  methods:{
    updateO(){
      // 改数据 交给App.vue去做
      this.updateOne(this.index)
      
    }
  }

  deleteO函数步骤同上

```
### Footer.vue
```
1.在App.vue中先把todos传给Footer
<Footer :todos="todos"></Footer>

2.在Footer.vue中接收todos
props:{
    todos:Array
  },

3.目标：根据todos计算出  已完成{{overNum}} / 全部{{allNum}}
computed: {
    overNum(){
      return this.todos.filter(item => item.isOver).length

      // return this.todos.filter(function(item){
      //   return item.isOver
      // }).length
    },
    allNum(){
      return this.todos.length
    }
  }, 

```

```
目标:item全选 footer就勾选 否则就不勾选 | item为0 footer不勾选
1.footer.vue中 v-model="isCheckAll" 
<input type="checkbox" v-model="isCheckAll" />
          <!-- 
            v-model 如果input当中是有value的,那么这个v-model收集/显示---影响的就是value的值 
            对于文本输入框、密码输入框来说一定是有value的
            对于单选输入框和多选输入框,如果没有写value，那么收集的是checked的值
           -->

2.计算
isCheckAll:{
      get(){
        // 一开始打勾的状态是需要去计算的
        return this.overNum === this.allNum && this.allNum > 0
      },
      set(){
        // 点击了全选,相当于在修改打勾的状态,是需要去计算的
        
      }
```



# props的写法
* 1.数组写法
```
 props:['comment','index'],
```

* 2.对象写法
```
props:{
    todo:Object
  }
```

* 3.接收属性的写法
```
props:{
  index:{
			type:Number,
			default:0
		}
}
```

# v-model
```
v-model 如果input当中是有value的,那么这个v-model收集/显示---影响的就是value的值 
            对于文本输入框、密码输入框来说一定是有value的
            对于单选输入框和多选输入框,如果没有写value，那么收集的是checked的值
```

* bug 管理平台 禅道
* 墨刀

## 面试必问 cookie和session
```
cookie存储的内容比较小  --- 用来做状态保持的,
					是因为浏览器端发送请求服务器端不认识,需要用cookie和session做状态保持,能够让服务器端能够认识服务器端两个请求时同一个客户发的
					服务器不认识两次发请求的是一个人,为了做到状态保持,出现了cookie
					
					cookie为了做到状态保持,带了一段文字到服务器,服务器接收到请求一看这两次的文字是一样的,那就是同一个人
					状态保持就是看你是不是一个人
					后来因为cookie安全性太不好了,人稍微一抓包就拿走了,而且把你的用户名密码看的清清楚楚,所以才出现了session

					session是谁的解决手段:session是服务器的解决手段	,服务器一般会在一个数据库里边,或者说是在服务器的一个文件里边去存储一个sesssion_Key
					当你第一次登录的时候,我们的服务端接收的请求会根据你的用户名和密码通过一个特殊的算法算出一个随机的字符串,而那个随机的字符串叫session_Key
					然后给你返回响应的时候会把那个session_Key给你带回来给用户,而用户会把session_key放在cookie里边传回去,
					这样就算抓包也只能拿到一个随机的字符串而拿不到用户名和密码
					session只是做安全性的保障
					但是session是依赖于cookie的
```

## 刷新还是原来的效果，不会回到初始的情况（数据存储分析）
```
				保存什么数据   todos
				数据保存在哪   localStorage
				什么时候保存   数据只要发生改变就该存储 ===== 》 深度监视
				什么时候读取   初始化显示就该读取，放在data中



				localStorage的简介（永久存储，关闭和刷新浏览器，数据不会丢失）
				---为了客户端人员更好的存储数据,我们可以认为它是我们前端的一个小的数据库---存储数据
				存储在浏览器端 在Application -localStorage和sessionStorage 存储数据的地方

					localStorage是h5新增的一种本地存储数据方式，本质是一个对象
					setItem(key,value)
					getItem(key)  如果没有返回null
					removeItem(key) 
					clear()
			
				cookie存储的内容比较小  --- 用来做状态保持的,
					是因为浏览器端发送请求服务器端不认识,需要用cookie和session做状态保持,能够让服务器端能够认识服务器端两个请求时同一个客户发的
					服务器不认识两次发请求的是一个人,为了做到状态保持,出现了cookie
					
					cookie为了做到状态保持,带了一段文字到服务器,服务器接收到请求一看这两次的文字是一样的,那就是同一个人
					状态保持就是看你是不是一个人
					后来因为cookie安全性太不好了,人稍微一抓包就拿走了,而且把你的用户名密码看的清清楚楚,所以才出现了session

					session是谁的解决手段:session是服务器的解决手段	,服务器一般会在一个数据库里边,或者说是在服务器的一个文件里边去存储一个sesssion_Key
					当你第一次登录的时候,我们的服务端接收的请求会根据你的用户名和密码通过一个特殊的算法算出一个随机的字符串,而那个随机的字符串叫session_Key
					然后给你返回响应的时候会把那个session_Key给你带回来给用户,而用户会把session_key放在cookie里边传回去,
					这样就算抓包也只能拿到一个随机的字符串而拿不到用户名和密码
					session只是做安全性的保障
					但是session是依赖于cookie的
          但是session是依赖于cookie的
					cookie和session都是可以设置过期时间的,默认是7天

```

```
[object Object]
数组的toString方法
函数的toString
对象的toString
localStorage存储数据的时候,会调用这个数据的toString方法(而且是递归调用)转化为字符串,然后进行存储
最终localStorage里边存储的一定是个字符串
```

## 一般监视和深度监视
```
一般监视和深度监视
				一般监视：
					数组本身发生改变
					数组内部元素整体改变
				深度监视：
					数组本身发生改变
					数组内部元素整体改变
					数组内部元素内部数据改变
```

* 一般监视
```
watch:{
    // 现在监视的是todos数组,没有监视数组里的内容
    // 一般监视:我们没办法取监视数组内部对象的数据,它是在监视数组本身的数据
    todos(newVal,oldVal){ 
      // 监视todos,只要todos发生改变就该存储到localStorage里边
      localStorage.setItem('TODOS_KEY',JSON.stringify(newVal))
      // JSON.stringify(newVal)转换成json字符串串,json字符串在前端对应的格式只有两种:对象的数组|对象
    }
  },
```

* 深度监视
```
深度监视数据，保存
				数据需要变为json然后取存储，否则数据下次取到的就看不懂了内部会调用对象的toString，数据变了
 watch:{
    // 深度监视:监视数组内部所有的数据
    todos:{
      deep:true,//代表打开深度监视
      handler(newVal,oldVal){
        localStorage.setItem('TODOS_KEY',JSON.stringify(newVal))
      }
    }
  },
```
* 数据从localStorage里边拿
```
 data() {
    return {
      // 数据要从localStorage里边拿
      todos:JSON.parse(localStorage.getItem('TODOS_KEY')) || []  //用JSON.parse()转化为数据 如果拿到的是null就把它变成空数据
    }
  },
```

# 自定义事件和系统定义事件
```
自定义事件：自己定义的事件：事件类型（自己定义,无数个）和回调函数（自己定义自己触发,自己调）

系统定义的事件：事件类型（固定几个）和回调函数（自己定义系统触发/浏览器调）
```

* 自定义事件
```
事件类型:  自己定义 无数个
  
回调函数: 自己定义 自己调用
```
* 系统定义事件
```
事件类型:  系统定义 固定几个
      Mouse事件: onclick ondbclick onmousedown onmouseup onmouseout onmousemove onmouseover
      Keyboard事件:onkeyup onkeydown 
      Form事件:onblur onchange onfocus

回调函数: 自己定义 浏览器/系统调用
```

# 原型链

![](D:\a-尚硅谷-前端\01尚硅谷前端\视频\16-刘渊vue\1-vue基础\vue基础\vue-liuyuan-code\vueComponent\13、vm和组件对象的关系.png)

### axios总结
*  axios基本使用
* 函数用法以及对象用法

```
 /**
             * axios中一共有三种参数
             * 1.params参数
             * 是和路径放在一块的,是路径中的一部分,而且params参数只能放在路径中
             * 2.query参数
             * 可以写在路径当中  以?开头 key=value
             * 也可以写在配置对象params写
             * params:{
             *   // params参数对应的是我们所说的query参数,url查询参数 ?key=value
             *   username='zhaoliying'
             *   },
             * 会自动的把username='zhaoliying' 拼在url后边,以?隔开
             * 如果url写了query参数,params就不需要写了,两个地方写一次就好
             * 3.请求体参数  POST 提交参数  
             * data:{
             *    // data参数对应的是请求体参数
             * }
             * 提交
             * POST GET(带query参数比较丰富) PUSH
             * DELETE(id)
             * 
             * axios返回的是一个Promise对象
             * 
             * async await 可以用同步代码实现异步操作
             * 只是简化代码 
             * asyns函数返回的一定是一个Promise
             */
```

```
/*
            async函数返回值一定是Promise
            返回的promise成功还是失败看这个函数的返回值

            没有return 返回undefinedh

            返回值分两种情况:返回值返回的是promise,要么就是一个数据,要么就是throw一个ERROR
            如果返回的是一个promise,那么这个async函数返回的promise成功还是失败就看这个promise的状态
            如果是一个ERROR,那么就是失败的
            其余都是成功的
            undefined 成功
        */
```
* 函数用法
```
<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js"></script>
    <script>
        // axios基本使用
        // 函数用法以及对象用法
        
        

        async function sendAjax(){
            try {
                const result = await axios({
            url:'https://api.github.com/search/repositories',
            //  /8也是一个参数,真正的params参数
            
            method:'GET',
            params:{
                // params参数对应的是我们所说的query参数,url查询参数 ?key=value
                // username='zhaoliying'
                q:'v',
                sort:'stars'
            },
            // data:{
            //     // data参数对应的是请求体参数
            // }
            })
            console.log(result.data)
            } catch (error) {
                console.log(error.message)
            }
        }
            
        // }).then(response=>{
        //     console.log(response.data)
        // }).catch(error=>{
        //     console.log(error.message)
        // })
        // }
        sendAjax()

        /*
            async函数返回值一定是Promise
            返回的promise成功还是失败看这个函数的返回值

            没有return 返回undefinedh

            返回值分两种情况:返回值返回的是promise,要么就是一个数据,要么就是throw一个ERROR
            如果返回的是一个promise,那么这个async函数返回的promise成功还是失败就看这个promise的状态
            如果是一个ERROR,那么就是失败的
            其余都是成功的
            undefined 成功
        */
    </script>
</body>
```

# users_pages
## 静态页面
* Header.vue
* Main.vue

## 动态展示
* Main.vue
```
 <div>
      <h2 v-if="isFirst">欢迎光临,请输入关键字进行搜索</h2>
      <h2 v-else-if="isLoading">正在搜索,请稍后</h2>
      <h2 v-else-if="errMsg">请求出错:{{errMsg}}</h2>
    <div v-else class="row" >
      <div class="card">
        <a href="https://github.com/reactjs" target="_blank">
          <img
            src="https://avatars.githubusercontent.com/u/6412038?v=3"
            style="width: 100px"
          />
        </a>
        <p class="card-text">reactjs</p>
      </div>
    </div>
  </div>

数据
 data() {
      return {
          isFirst:true,
          isLoading:false,
          errMsg:'',
          users:[]
      }
  },
```

```
Ajax请求在哪发？
在Header中发,回来的数据也在Header中
数据要传给Main,通信太频繁

在Main里边发请求,拿回来数据在Main里边,在Main中改自己的数据
```
```
  methods:{
    searchAjax(q){
      //在发送ajax请求之前，让页面显示正在请求中
      this.isFirst = false
      this.isLoading = true
      //就可以根据searchName去发送ajax请求
      axios({
        url:'https://api.github.com/search/users',
        method:'get',
        params:{
          q
        }
      }).then(response => {
        let userList = response.data.items.map(item => {
          return {
            userName:item.login,
            userUrl:item.url,
            userImg:item.avatar_url
          }
        })
        this.users = userList
        this.isLoading = false  //请求成功拿到数据，显示用户信息

      }).catch(error => {
        this.errMsg = error.message
        this.isLoading = false //请求失败拿到错误信息，显示错误信息
      })
    }
  }
};
```

* Header.vue
```
1.
<input type="text" placeholder="enter the name you search" v-model="searchName"/>
v-model="searchName" 收集数据

2.
 data() {
      return {
          searchName:'',
      }
  },

3.
<button @click="search">Search</button>
点击search 触发search回调


5.Header和Main为兄弟组件 ---- 全局事件总线
new Vue({
  <!-- 配置总线 -->
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#root',
  render: h => h(App)
})

6.在你想要拿数据的地方绑定事件
Main想要拿到数据
在Mounted里边绑定事件
mounted() {
      this.$bus.$on('searchAjax',this.searchAjax)
  },

7.在你想要发送数据的地方触发事件
Header中发送数据
methods:{
      search(){
        //   当你一旦点击search，把关键字传给Main，让它在Main中发请求
        // 本来我们可以在这发送请求获取数据,但是在这获取到数据是都要通信操作给Main去存储
        // 因为我们的数据设计在Main当中
        // 所以我们在这可以把输入的关键字搜索名字 传递给Main组件,然后在Main组件党章去发请求
        // 这样的话，Main组件拿到数据后不用通信直接修改存储

        this.$bus.$emit('searchAjax',this.searchName) //触发事件,并把数据传过去
      }
  }
```

## async 和 await
* sync 同步
* async 异步

## 跨域
```
1.什么是跨域?
跨域是存在于 【浏览器】上的同源验证策略
同源验证策略:你发送请求的目标和你自己的站位置一样还是不一样
只要不一样就是跨域

  1.跨域只存在于浏览器
  2.不在浏览器发请求是不会存在跨域问题的
  3.http请求分为两大类:普通http请求(一般不会出现跨域的)和Ajax请求(跨域是出现在ajax请求)
          
2.在什么地方会跨域
  浏览器会跨域 服务器不会

3.什么条件会跨域
  同源(协议 ip 端口一致) 不跨域
  不同源跨域(三个中间有一个不一样就跨域)
  http://localhost:8080/   -----> github 必然跨域 尤其是ajax请求

4.解决跨域
  前端可以解决(jsonp和配置代理)、后端也可以解决(比较容易) 
  一般后端解决比前端容易

解决跨域
1.jsonp
2.cors
2.代理服务器
```

# 配置代理服务器
```
1.github 上搜索 express 最上边那个

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

2.安装
npm install express -S
```

```
9000 devServer 前端 浏览器       4000 后端
在9000端口 给  4000端口 发请求必然跨域 
站在9000端口 给 4000端口 发请求必然跨域

proxy代理 
不直接给4000端口发请求
而是给 webpack devServer 发请求
好处:浏览器和webpack devServer目前的端口是一样的 都是9000
浏览器跑在 webpack devServer身上,而且 webpack devServer身上有一个proxy模块
可以把服务请求发给 webpack devServer内部的proxy
proxy一看浏览器想跨域,proxy会把这个请求转发出去
任何的请求发出去都要经过看门狗(proxy),如果需要跨域就给你转发,如果不需要跨域直接访问它


```
* 配置代理服务器解决跨域
```
1.本身我们现在浏览器就跑在开发服务器 webpack-dev-server
  而这个服务器带了一个魔窟啊哎,这个模块可以支持我们使用代理

2.原理:在浏览器发请求的适合,把这个请求发给服务器上的这个代理模块(proxy)
  再由这个代理模块转发给我们真正的服务器
  这样的话,我们原来由浏览器直接发送请求到服务器就转化为服务器到服务器之间的请求

3.你要让代理转发,那么就得告诉代理你的这个请求需要转发
  配置以固定什么开头的路径需要代理转发,代理看到这个路径是以它开头就会帮你转发

4.代理转发的时候会把路径交给真正的请求服务器,作为请求路径,需要把固定的开头去除

5.changeOrigin:true,  //支持跨域,如果协议/主机也不相同,必须加上
  proxy: {
            "/api": {
              //  /api  发的请求带/api代表要跨域,否则不要跨域
                target: "http://localhost:4000", //告诉代理如果碰到了/api开头的路径把请求转发到target
                <!-- 
                    localhost:9000/api/users/info 我们请求的路径
                    经过代理
                    localhost:4000/api/users/info 代理转发的初始路径
                    pathRewrite
                    localhost:4000/users/info
                 -->
                pathRewrite: {"^/api" : ""},//代理会把身份标识的东西去掉,替换成空串
                changeOrigin:true  // 协议 IP 端口任何改变都会解决
	    }
	}		

前端运行在9000 运行在开发服务器webpack-dev-server 
如果从9000直接发 9000 ---> 4000 肯定跨域  
现在让9000 ---> 9000 自己给自己要数据   相当于给webpack-dev-server这个服务器要数据
而webpack-dev-server服务器里边有一个配置模块,相当于一个看门狗,这个模块你配置了,这个看门狗就会帮你看门
这个看门狗如果不配置它是不会给你看门的,这个看门狗就是proxy代理
你只要配置了proxy代理,今后你发的所有请求都会经过这个看门狗,帮你过滤出一些东西
代理(看门狗)给了你一个身份并标识,只要你的路径中是以/api开头的,就让看门狗拿出来单独转发,如果你的路径不是以/api开头的,这个看门狗相当于啥也不知道,啥都不干
而代理是在webpack-dev-server 服务器上的,而不是在浏览器上的
而浏览器9000直接给4000端口发请求就转化为服务器9000给4000端口发请求,服务器之间不存在跨域问题,跨域只存在浏览器上
所以服务器给它发请求是不会存在跨域的,那么数据就会先给服务器,服务器再转发给浏览器
代理服务器上的数据为什么浏览器可以拿?
浏览器本身就跑在9000端口
因为他俩都是9000端口,没有跨域




 
```
```
/**
 * 什么是路由?
 * 路由最终是key和value的映射关系
 * 是路径和一个东西的映射关系
 * 
 * 后端路由
 * 一个路径对应一个函数
 * 
 * 前端路由
 * 一个路径对应一个组件
 * 
 */

//  启动服务  node 文件名
```
* @babel/polyfill 解决Async await

# Vuex  官网---印记中文
```
负责管理数据
集中统一管理数据
对于数据的增删改查一系列操作从Vue.js中脱离出来

核心概念(5个):
  State
  Getter
  Mutation
  Action
  Module
```

* 1.安装vuex
```
npm install vuex --save
```
* vuex--->store.js
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)  //安装插件 --- 声明使用插件 安装给Vue了
```

```
export default new Vuex.Store({
  state:{

  },
  mutations:{

  },
  actions:{

  },
  getters:{

  }
})
```

```
const state = {
  //是专门用来存数据(状态)的地方,它是一个对象  ---仓库---管数据
  //是一个包含多个属性和属性值的对象
}

const mutations = {
  //专门用来更新数据的各种方法组成的对象
  //这些个方法必须是直接修改数据的方法,不能在这些方法内部存在 判断 循环 异步  ---改数据
  //一系列直接修改数据的方法
}

const actions = {
  //难点
  //专门用来和组件行为(用户行为)进行对接的各种方法组成的对象
  //还有一个作用,用来对接成功后 告知相应的mutations中的对应方法去修改数据---调函数 一定有队列
  //能在这些方法内部存在 判断 循环 异步  

  //1.包含一系列和用户对接的方法
  //2.通知mutations中的对应的方法进行数据更改

  1.对接用户行为
  2.对接mutations
}

const getters = {
  //如果用户想要获取根据state中的数据计算出来的数据就可以写在这里
  //计算属性

  //一系列的方法---计算属性(get方法) 根据state中的数据计算出来用户要使用的数据

}

<!-- 最终向外暴露了一个对象 -->
export default new Vuex.Store({  
  state,//f
  mutations,
  getters,
  actions
})
```

```
Vuex是Vue的状态管理
什么是状态?状态可以理解为数据
用Vuex管理数据

store.js  状态管理---管理数据的

```

```
1.在main.js中引入store
import store from '@/vuex/store'

2.把store在Vue的配置对象当中配置
const vm = new Vue({
  el:'#root',
  render: h => h(App),
  store   //如果我们声明使用（注册）store(vuex)，那么每个组件对象都可以通过this.$store拿到我们的store对象
})
```