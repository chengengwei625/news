const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'nav-bar-background-color': '#007dff',
            // 'nav-bar-title-text-color': '#fff'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, '/src/styles/cover.less')}";`
          }
        }
      }
    }
  },
  publicPath: './' //告诉webpack打包的index.html引入其他资源文件以./开头,不要默认/开头
}
