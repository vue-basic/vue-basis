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
     template:'<App/>' //就是vue渲染的模板,之前我们写在挂载点下边，现在我们换了个地方去写s
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

## 12.comment组件化开发（案例）
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

### 1.props
```
props组件间通信 是通过属性传递数据 
只能用于父子之间 一级一级进行传递
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

