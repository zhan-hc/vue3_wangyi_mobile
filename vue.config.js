const path = require('path') //引入path模块
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 打包可视化

function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    hotOnly: false,
    proxy: {
      //设置代理，必须填
      '/api': {
        //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'https://netease-cloud-music-api-gamma-eight.vercel.app', //代理的目标地址，这是豆瓣接口地址网址
        changeOrigin: true, //是否设置同源，输入是的
        pathRewrite: {
          //路径重写
          '/api': '/', //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
        },
      },
    },
    before: (app) => {},
  },
  css: {
    modules: false,
    extract: true,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `
        @import '@/assets/scss/common.scss';
        @import '@/assets/scss/mixins.scss';
        @import '@/assets/scss/_handle.scss';
        `,
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: ['*'],
          }),
        ],
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      // new BundleAnalyzerPlugin(),
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true,
        })
      )
    }
  },
}
