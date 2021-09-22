module.exports = {
    configureWebpack: config => {
      config.externals = {
        'leaflet': 'L',
        'mapboxgl':'mapboxgl',
        'MapboxGeocoder':'MapboxGeocoder',
      }
    },
    css: {
      extract: false
    }
  }