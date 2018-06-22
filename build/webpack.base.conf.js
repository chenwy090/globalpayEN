'use strict'
// 引入nodejs 内置模块 path
const path = require('path')
// 引入公共的配置方法
const utils = require('./utils')
// 引入基本参数配置
const config = require('../config')
// 引入vue-loader
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  //拼接出绝对路径
  return path.join(__dirname, '..', dir)
}


//path.join将路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃

//path.join('/a', '/b') // 'a/b',path.resolve('/a', '/b') // '/b'
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    //配置入口，默认为单页面所以只有app一个入口
    app: './src/main.js'
  },
  //配置出口，默认是/dist作为目标文件夹的路径
  output: {
    path: config.build.assetsRoot,//出口文件目录
    filename: '[name].js',// 打包文件名字
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath// 公共存放路径
  },
  resolve: {
    //自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    extensions: ['.js', '.vue', '.json'],
    //创建路径的别名，比如增加'components': resolve('src/components')等
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  }, 
  //使用插件配置相应文件的处理方法
  module: {
    rules: [
      //使用vue-loader将vue文件转化成js的模块
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //js文件需要通过babel-loader进行编译成es5文件以及压缩等操作②
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      //图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64③
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
