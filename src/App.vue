<template>
  <h1 class="text-center">HELLO WORLD! RP TRACKER APP</h1>
<div class="d-flex justify-content-center align-items-center">
  <br><br/>
  <button
      class="btn btn-primary m-2"
      v-for="(marker , index) in markers"
      :key=index
      v-on:click="marker.isMarkerDraggable = !marker.isMarkerDraggable"
      v-html="`Marker ${marker.id} Lat:${markers[0].position.lat}  Lng:${markers[0].position.lng} draggable ${marker.isMarkerDraggable}`"
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
    <t-circle
      :radius="400"
      :lat="marker.position.lat"
      :lng="marker.position.lng">
    </t-circle>
    <t-circle
      :radius="900"
      :lat="marker.position.lat"
      :lng="marker.position.lng">
    </t-circle>
    <t-circle
      :radius="2000"
      :lat="marker.position.lat"
      :lng="marker.position.lng">
    </t-circle>
    </t-marker>
  </t-map>
  <!-- <t-map v-bind:mapid="'map1'" v-bind:mapheight="mapSettings.mapheight" v-bind:mapwidth="mapSettings.mapwidth">
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
  </t-map> -->
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Marker from "./components/Marker.vue";
import Circle from "./components/Circle.vue";

export default {
  name: "App",
  components: {
    "t-map": Map,
    "t-marker": Marker,
    "t-circle": Circle
  },
  data: function () {
    return {
      mapSettings:{
        mapheight:"60vh",
        mapwidth:"98vw"
      },
      markers: [
        {
          id:0,
          isMarkerDraggable : true,
          position : {
          lat: 53.50,
          lng: -2.19,
          }
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
