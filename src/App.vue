<template>
  <h1>HELLO WORLD! RP TRACKER APP</h1>
  <div id="mapid"></div>
</template>

<script>

import L from 'leaflet'


export default {
  name: 'App',
  mounted:function(){
    this.testMap()

  },
  methods:{
    testMap:function(){
      var mymap = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoiYm9va2luZ29ubGluZSIsImEiOiJja2Job2U3MDUwN2ExMnRxdm53Njd3MXEzIn0.KDd8MAU8eEW0EHi9Vfn7wA"
      }).addTo(mymap);

    }
  },

}
</script>

<style>
  #mapid { height: 100vh; }
</style>
