'use strict'
// 引入node内置模块path
const path = require('path')
// 引入公共方法utils
const utils = require('./utils')
// 引入webpack 
const webpack = require('webpack')
// 引入基本配置
const config = require('../config')
// 引入合并插件 ;通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const merge = require('webpack-merge')
// 引入公共的配置
const baseWebpackConfig = require('./webpack.base.conf')
// 引入文件复制、移动插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题;
// 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象 
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// js 压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 引入 prod.env 配置
const env = require('../config/prod.env')
// 合并对象， 并继承 webpack.base.config.js 
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap, // 开启调试的模式。默认为true
      extract: true,
      usePostCSS: true
    })
  },
  // 配置调试 模式
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot, // 打包后的文件目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 带包后文件名
    chunkFilename: utils.assetsPath('js/[name].[chunkhash]js') //非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env //配置全局环境为生产环境
    }),
    new UglifyJsPlugin({//js文件压缩插件
      uglifyOptions: {
        compress: {
          warnings: false // 不显示警告  
        }
      },
      sourceMap: config.build.productionSourceMap,// 是否生成sourcMap 文件 
      parallel: true
    }),
    // extract css into its own file ；将js中引入的css分离的插件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),//分离出的css文件名
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // 将以下选项设置为'false'不会从代码分割块中提取CSS。
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // 当codeplit块已被webpack加载时，它们的CSS将会通过style-loader动态插入。
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // 它目前被设置为“true”，因为我们看到sourcemap被包含在codesplit包中，以及当它是'false'时， 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // 我们正在使用这个插件压缩提取的CSS。
    // duplicated CSS from different components can be deduped.
    // 可以从不同组件复制CSS。
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.使用正确的资产哈希生成用于缓存的dist index.html。
    // you can customize output by editing /index.html 您可以通过编辑/index.html来自定义输出
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,//注入选项。有四个选项值 true, body(同true), head(script 标签位于 head 标签内), false(不插入生成的 js 文件，只是单纯的生成一个 html 文件). 默认值，script标签位于html文件的 body 底部
      minify: {
        removeComments: true, //删除注释
        collapseWhitespace: true, //删除空格
        removeAttributeQuotes: true //删除属性的引号   
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' //模块排序，按照我们需要的顺序排序
    }),
    // keep module.id stable when vendor modules does not change
    //供应商模块不变时，请保持module.id稳定
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting 使范围提升
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file将供应商js分割成它自己的文件
    new webpack.optimize.CommonsChunkPlugin({// 抽取公共模块
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        // 声明公共的模块来自node_modules文件夹
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // 以便将webpack运行时和模块清单提取到其自己的文件
    // prevent vendor hash from being updated whenever app bundle is updated
    // 防止更新应用程序包时更新供应商散列
    //下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    //这个实例从代码拆分块中提取共享块并捆绑它们
    // in a separate chunk, similar to the vendor chunk
    // 在一个单独的块中，类似于供应商块
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 复制移动文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {//配置文件开启了gzip压缩
  // 引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',//目标文件名
      algorithm: 'gzip',//使用gzip压缩
      test: new RegExp(//满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,//资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8//最小压缩比达到0.8时才会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
