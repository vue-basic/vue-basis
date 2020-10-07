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
```
