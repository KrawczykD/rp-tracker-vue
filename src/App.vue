<template>
  <div class="row m-0">
    <div class="col-6">
      <t-list
        :points="[
          [0, 10],
          [10, 20],
          [20, 30],
          [30, 40],
          [40, 50],
          [50, 60],
          [60, 70],
          [70, 80],
          [80, 90],
          [90, 100],
        ]"
      ></t-list>
    </div>
    <div class="col-6">
      <div class="col-12 d-flex justify-content-center p-4">
        <i class="fa fa-home fs-1 px-4"></i><t-geocoder :id="'user'" v-on:search="setMarker($event ,baseMarker)"></t-geocoder>
        <i class="fa fa-car fs-1 px-4"></i><t-geocoder :id="'base'" v-on:search="setMarker($event ,markers[0])"></t-geocoder>
      </div>
      <div class="col-12">
        <t-map
          v-bind:mapid="'map0'"
          v-bind:mapheight="mapSettings.mapheight"
          v-bind:mapwidth="mapSettings.mapwidth"
        >
          <t-marker
            v-for="(marker, index) in markers"
            :key="index"
            :icon="`fa fa-car fs-1`"
            :lat="marker.position.lat"
            :lng="marker.position.lng"
            :draggable="marker.isMarkerDraggable"
            v-on:moveMarker="moveMarker($event ,marker)"
          >
          </t-marker>
          <t-marker
            :lat="baseMarker.position.lat"
            :icon="`fa fa-home fs-1`"
            :lng="baseMarker.position.lng"
            :draggable="baseMarker.isMarkerDraggable"
            v-on:moveMarker="moveMarker($event ,baseMarker)"
          >
          </t-marker>
        </t-map>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Marker from "./components/Marker.vue";
import fetchPostcodes from "./components/fetchPostcodes.vue";
import geocoder from "./components/geoCoder.vue";
import List from "./components/List.vue";
import { latLng } from "leaflet";

export default {
  name: "App",
  components: {
    "t-map": Map,
    "t-marker": Marker,
    "t-geocoder": geocoder,
    "t-list": List,
  },
  data: function () {
    return {
      mapSettings: {
        mapheight: "90vh",
        mapwidth: "100%",
      },
      isInRange: false,
      baseMarker:
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.5,
            lng: -2.32,
          },
          postcodes: [],
        },

      markers: [
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.60,
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
    moveMarker: function (latLng,marker) {
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

    setMarker: function (result,marker) {

      marker.position = latLng(result.center[1], result.center[0]);

      this.checkDelivery(marker);
    },

    checkDelivery: function () {


    },
  },
};
</script>

<style>
#mapid {
  height: 100vh;
}
</style>
