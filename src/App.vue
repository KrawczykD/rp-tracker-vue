<template>
<div class="d-flex flex-column justify-content-center align-items-center">

  <h1>HELLO WORLD! RP TRACKER APP</h1>
  <div>Marker Id 0 Lat:{{ markers[0].position.lat }} Lng:{{ markers[0].position.lng }}</div>
  <br><br/>
  <button
      class="btn btn-primary m-2"
      v-for="(marker , index) in markers"
      :key=index
      v-on:click="marker.isMarkerDraggable = !marker.isMarkerDraggable"
      v-html="'Make marker' + ' ' + marker.id + ' ' + 'draggable' + ' ' + marker.isMarkerDraggable"
  ></button>
  <br><br/>
</div>
  <div class="d-flex justify-content-around">

  <t-map v-bind:mapid="'map0'" v-bind:mapheight="mapSettings.mapheight" v-bind:mapwidth="mapSettings.mapwidth">
    <t-marker
      v-for="(marker , index) in markers"
      :key=index
      :markerid="marker.id"
      :lat="marker.position.lat"
      :lng="marker.position.lng"
      :draggable="marker.isMarkerDraggable"
      v-on:moveMarker="moveMarker"
    >
    </t-marker>
  </t-map>
  <t-map v-bind:mapid="'map1'" v-bind:mapheight="mapSettings.mapheight" v-bind:mapwidth="mapSettings.mapwidth">
    <t-marker
      v-for="(marker , index) in markers"
      :key=index
      :markerid="marker.id"
      :lat="marker.position.lat"
      :lng="marker.position.lng"
      :draggable="marker.isMarkerDraggable"
      v-on:moveMarker="moveMarker"
    >
    </t-marker>
  </t-map>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Marker from "./components/Marker.vue";

export default {
  name: "App",
  components: {
    "t-map": Map,
    "t-marker": Marker,
  },
  data: function () {
    return {
      mapSettings:{
        mapheight:"50vh",
        mapwidth:"40vw"
      },
      markers: [
        {
          id:0,
          isMarkerDraggable : true,
          position : {
          lat: 53.50,
          lng: -2.19,}
        },
         {
          id:1,
          isMarkerDraggable : false,
          position : {
          lat: 53.52,
          lng: -2.20,}
        },
      ],
    };
  },
  methods: {
    moveMarker: function (id, latLng) {
      this.markers[id].position = latLng;
    },
  },
};
</script>

<style>
#mapid {
  height: 100vh;
}
</style>
