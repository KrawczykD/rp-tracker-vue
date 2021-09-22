<template>
  <h1 class="text-center">HELLO WORLD! RP TRACKER APP</h1>
  <h2 :class="['text-center', isInRange ? 'btn-success' : 'btn-danger']">
    {{
      isInRange
        ? "Grate news! We can delivery to your address!"
        : "Bad news! We can NOT delivery to your address :("
    }}
  </h2>
  <div class="d-flex justify-content-center align-items-center">
    <br /><br />
    <t-geocoder v-on:search="setMarker"></t-geocoder>
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
      </t-marker>
      <template v-for="(area, index) in areas" :key="index">
        <t-circle
          v-for="(circle, index) in area.radiusInMeters"
          :key="index"
          :radius="circle.value"
          :color="circle.color"
          :lat="area.position.lat"
          :lng="area.position.lng"
        >
        </t-circle>
      </template>
    </t-map>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Marker from "./components/Marker.vue";
import Circle from "./components/Circle.vue";
import fetchPostcodes from "./components/fetchPostcodes.vue";
import geocoder from "./components/geoCoder.vue";
import { latLng } from "leaflet";

export default {
  name: "App",
  components: {
    "t-map": Map,
    "t-marker": Marker,
    "t-circle": Circle,
    "t-geocoder": geocoder,
  },
  data: function () {
    return {
      mapSettings: {
        mapheight: "82vh",
        mapwidth: "98vw",
      },
      isInRange: false,
      markers: [
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.5,
            lng: -2.32,
          },
          postcodes: [],
        },
      ],
      areas: [
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.5,
            lng: -2.19,
          },
          radiusInMeters: [
            { value: 6000, color: "#FF0000" },
            { value: 800, color: "#00FF00" },
            { value: 500, color: "#0000FF" },
          ],
        },
        {
          id: 1,
          isMarkerDraggable: true,
          position: {
            lat: 53.56,
            lng: -2.42,
          },
          radiusInMeters: [
            { value: 6000, color: "#FF0000" },
            { value: 800, color: "#00FF00" },
            { value: 500, color: "#0000FF" },
          ],
        },
        {
          id: 2,
          isMarkerDraggable: true,
          position: {
            lat: 53.6,
            lng: -2.21,
          },
          radiusInMeters: [
            { value: 6000, color: "#FF0000" },
            { value: 800, color: "#00FF00" },
            { value: 500, color: "#0000FF" },
          ],
        },
      ],
    };
  },
  methods: {
    moveMarker: function (id, latLng) {
      // let base = this.markers[0];
      let marker = this.markers[id];

      marker.position = latLng;
      // set postcode on marker move
      this.setPostcodes(marker);

      // get distance betwean base and client

      this.checkDelivery(marker);
    },

    setPostcodes: function (marker) {
      fetchPostcodes.getPostcode(marker.position).then((res) => {
        res.json().then((x) => {
          marker.postcodes = x.features;
        });
      });
    },

    setMarker: function (result) {
      // let base = this.markers[0];
      let marker = this.markers[0];

      marker.position = latLng(result.center[1], result.center[0]);

      this.checkDelivery(marker);
    },

    checkDelivery: function (marker) {
      let areas = this.areas;
  // TODO just for test 
      if (
        latLng(marker.position).distanceTo(areas[0].position) <
        areas[0].radiusInMeters[0].value 
        || 
        latLng(marker.position).distanceTo(areas[1].position) <
        areas[1].radiusInMeters[0].value
        || 
        latLng(marker.position).distanceTo(areas[2].position) <
        areas[2].radiusInMeters[0].value
      ) {
        this.isInRange = true;
      } else {
        this.isInRange = false;
      }
    },
  },
};
</script>

<style>
#mapid {
  height: 100vh;
}
</style>
