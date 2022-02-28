const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 100   //基准大小 baseSize,建议写100 因为可以根据1rem=100px 快速算出设计图的尺寸
})

module.exports = {
  // chainWebpack: config => {
  //   config.externals= {
  //       'AMap': 'AMap'
  //      }
  // },
  configureWebpack: config => {
    config.externals = {
      AMap: "AMap"
    },
      require('@vux/loader').merge(config, {
        plugins: ['vux-ui']
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      },
      sass: {
        prependData: `@import "@/assets/styles/global.scss";`
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '9080',
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.2.108:9080/crm',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/api'
        // },
      }
    }
  }
}