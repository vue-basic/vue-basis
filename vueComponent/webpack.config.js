// 引入path
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin'); //构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        use: ['vue-style-loader', 'css-loader'] //前后顺序不能变 解析时从右向左 css是在js中的,style-loader把js中的css放到style中
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
      },
      // 配置vue相关loader
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  //   插件 plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    }),//加一个配置对象让vue可以找到对应的模板挂载点 ,本质就是让vue去找对应的html文件
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from:'./src/public',
      to:path.resolve(__dirname, 'dist'),//配置的是绝对路径
      ignore: ['index.html'] ,//必须是一个数组
    }]),//为了把css拷贝到dist下
  ],
  // 基础配置
  devServer: {
    port: 9000, //端口
    open: true,//自动打开浏览器
    quiet: true,//log日志
  },
  devtool: 'cheap-module-eval-source-map',
  // 自动解析
  resolve: {
    extensions: [".js", ".json", ".vue"],
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, 'src') //这个别名代表以后@就是src的绝对路径
    }
  },

};


