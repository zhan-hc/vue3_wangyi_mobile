const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: './',
  devServer: {
		host: '0.0.0.0',
		port: 8080,
		https: false,
		open: true,
		hotOnly: false,
		proxy: {                 //设置代理，必须填
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'https://netease-cloud-music-api-gamma-eight.vercel.app',     //代理的目标地址，这是豆瓣接口地址网址
        changeOrigin: true,              //是否设置同源，输入是的
        pathRewrite: {                   //路径重写
            '/api': '/',                    //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
        }
      }
    },
		before: app => {},
	},
  css: {
		modules: false,
		extract: true,
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			css: {},
			postcss: {
				plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
			}
		},
	},
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack:(config)=>{
    config.resolve.alias
    //set第一个参数：设置的别名，第二个参数：设置的路径
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('assets',resolve('./src/assets'))
    .set('views',resolve('./src/views'))
    .set('network',resolve('./src/network'))　　
  }
}