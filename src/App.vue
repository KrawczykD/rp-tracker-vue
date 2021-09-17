<template>
  <h1>HELLO WORLD! RP TRACKER APP</h1>
  <button v-on:click="add('long')">Longitude +</button>
  <button v-on:click="add('lat')">Latitude +</button>
  <t-map>
    <t-marker :lat="lat" :long="long">

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
      lat : 53.50,
      long : -2.19
    }
  },
  methods:{
    add:function(option){
      if(option === 'lat'){
        this.lat += 0.001
      } else {
        this.long += 0.001
      }
    }
  }
}
</script>

<style>
  #mapid { height: 100vh; }
</style>
