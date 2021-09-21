<template>
  <h1>HELLO WORLD! RP TRACKER APP</h1>
  <div>Marker Id 0 Lat:{{markers[0].lat}} Lng:{{markers[0].lng}}</div>
  <t-map>
    <t-marker :markerid="0" :lat="markers[0].lat" :lng="markers[0].lng" v-on:moveMarker="moveMarker">

    </t-marker>
  </t-map>
</template>

<script>

import Map from './components/Map.vue'
import Marker from './components/Marker.vue'

export default {
  name: 'App',
  components:{
    "t-map" : Map,
    "t-marker" : Marker
  },
  data:function(){
    return {
      markers:[
        {
          lat : 53.50,
          lng : -2.19
        }
      ]
    }
  },
  methods:{
    moveMarker:function(id,latLng){
      this.markers[id] = latLng
    }

  }
}
</script>

<style>
  #mapid { height: 100vh; }
</style>
