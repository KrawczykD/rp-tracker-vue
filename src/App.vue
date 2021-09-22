<template>
  <h1 class="text-center">HELLO WORLD! RP TRACKER APP</h1>
  <div class="d-flex justify-content-center align-items-center">
    <br /><br />
    <button
      class="btn btn-primary m-2"
      v-for="(marker, index) in markers"
      :key="index"
      v-on:click="marker.isMarkerDraggable = !marker.isMarkerDraggable"
      v-html="
        `Marker ${marker.id} Lat:${markers[0].position.lat}  Lng:${markers[0].position.lng} draggable ${marker.isMarkerDraggable}`
      "
    ></button>
    <br /><br />
  </div>
  <div class="d-flex justify-content-around">
    <t-map
      v-bind:mapid="'map0'"
      v-bind:mapheight="mapSettings.mapheight"
      v-bind:mapwidth="mapSettings.mapwidth"
    >
      <t-marker
        v-for="(marker, index) in markers"
        :key="index"
        :markerid="marker.id"
        :lat="marker.position.lat"
        :lng="marker.position.lng"
        :draggable="marker.isMarkerDraggable"
        v-on:moveMarker="moveMarker"
      >
        <t-circle
          v-for="(radius, index) in marker.radiusInMeters"
          :key="index"
          :radius="radius.value"
          :color="radius.color"
          :lat="marker.position.lat"
          :lng="marker.position.lng"
        >
        </t-circle>
      </t-marker>
    </t-map>
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
    "t-circle": Circle,
  },
  data: function () {
    return {
      mapSettings: {
        mapheight: "60vh",
        mapwidth: "98vw",
      },
      markers: [
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.5,
            lng: -2.19,
          },
          radiusInMeters: [{value:2000 ,color:"#FF0000" }, {value:800 ,color:"#00FF00" }, {value:500 ,color:"#0000FF" },]
        },
        {
          id: 1,
          isMarkerDraggable: false,
          position: {
            lat: 53.52,
            lng: -2.2,
          },
          radiusInMeters: [{value:4000 ,color:"#FF33AA" }, {value:3000 ,color:"#33FFAA" }, {value:500 ,color:"#33AAFF" },]
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
