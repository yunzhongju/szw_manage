module.exports = {
	// 基本路径
	publicPath: process.env.NODE_ENV === 'production'
	    ? '/'
	    : '/',
	devServer: {
		"port":8000,
		'host': '127.0.0.1',
		"disableHostCheck":true,
		 proxy: {
			"/api": {
				target: "http://47.111.226.60:4440",
				// target: "http://132.232.74.143:4440",
				// target: "http://192.168.0.6",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/api": ''
				}
			},
		}
	}
}
