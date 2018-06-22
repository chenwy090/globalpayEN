  'use strict'
// 引入公共的方法utils
const utils = require('./utils')
// 引入wepback
const webpack = require('webpack')
// 引入基本配置
const config = require('../config')
// 引入合并插件 ;通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const merge = require('webpack-merge')
// 引入path 对象
const path = require('path')
// 引入公共配置
const baseWebpackConfig = require('./webpack.base.conf')
// 引入文件复制、移动插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题;
// 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 美化webpack 的错误信息和日志的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 查看空闲端口位置，默认情况下搜索8000这个端口②
const portfinder = require('portfinder')
// 获取package.json 里面是否有 --host 192.168.0.0 属性 如果能接受就将localhost 替换成配置的IP（192.168.0.0）
const HOST = process.env.HOST
// 获取package.json 里面是否有 --port 8888 属性 如果能接受的到将 默认端口替换成配置的 端口8888
const PORT = process.env.PORT && Number(process.env.PORT)
// 合并对象 并且继承 baseWebpackConfig 另外配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // 增强调试。能更好的定位错误信息在哪个位置
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',//控制台显示的选项有none, error, warning 或者 info
    //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,// 热加载
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,//压缩
    host: HOST || config.dev.host, // 接受host 
    port: PORT || config.dev.port, // 接受 端口
    open: config.dev.autoOpenBrowser, // 调试时候是否自动打开浏览器
    overlay: config.dev.errorOverlay // 显示警告和错误
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, //指定资源文件引用的目录
    proxy: config.dev.proxyTable, // 接口代理
    quiet: true, // necessary for FriendlyErrorsPlugin // 控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true
    watchOptions: {
      poll: config.dev.poll,// 文件系统检测改动
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),// 模块热替换插件，修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update. // 显示文件的正确名字
    new webpack.NoEmitOnErrorsPlugin(), //当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中 // https://github.com/ampedandwired/html-webpack-plugin
    // https://github.com/ampedandwired/html-webpack-plugin 
    // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets 复制文件 移动文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 查看端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests； 端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin ；友好地输出信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
