module.exports = {
  // devServer: {
	// 	host: '0.0.0.0',
	// 	port: 8080,
	// 	https: false,
	// 	open: true,
	// 	hotOnly: false,
	// 	proxy: null, // 设置代理
	// 	before: app => {},
	// },
  css: {
		modules: false,
		extract: true,
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			css: {},
			postcss: {
				plugins: [
					require('postcss-px2rem')({
						remUnit: 75
					})
				]
			}
		},
	}
}