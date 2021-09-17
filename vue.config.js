module.exports = {
    configureWebpack: config => {
      config.externals = {
        'leaflet': 'L'
      }
    },
    css: {
      extract: false
    }
  }