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


