module.exports = {
    //必须：
    //部署到web服务器后页面显示空白的问题
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    devServer: {
        proxy: {
            '': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {

                }
            }
        },
        open: true,
        overlay: {
            warning: false,
            errors: false
        }
      
    },
    lintOnSave: false
}