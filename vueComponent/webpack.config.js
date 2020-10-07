// 引入path
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin'); //构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // 入口
  entry: './src/main.js',
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
      // ES6转化ES5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        // exclude不解析谁
        use: {
          loader: 'babel-loader',
          options: {//扩展项
            presets: ['@babel/preset-env']  //更方便的引入
          }
        }
      },
      // 解析css
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ] //前后顺序不能变 解析时从右向左 css是在js中的,style-loader把js中的css放到style中
      },
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
    ]
  },
  //   插件 plugins
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  // 基础配置
  devServer: {
    port: 9000 , //端口
    open:true,//自动打开浏览器
    quiet:true,//log日志
  },
  devtool:'cheap-module-eval-source-map'
};


