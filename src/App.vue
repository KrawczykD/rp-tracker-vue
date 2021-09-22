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
    <t-geocoder
      v-on:search="setMarker"
    ></t-geocoder>
    <button
      :class="[
        'btn m-2',
        markers[1].isMarkerDraggable ? 'btn-success' : 'btn-danger',
      ]"
      :key="index"
      v-on:click="markers[1].isMarkerDraggable = !markers[1].isMarkerDraggable"
      v-html="
        `Base marker is ${
          markers[1].isMarkerDraggable ? 'draggable' : 'non draggable'
        }`
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
import fetchPostcodes from "./components/fetchPostcodes.vue";
import geocoder from "./components/geoCoder.vue";
import { latLng } from 'leaflet'

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
          isMarkerDraggable: false,
          position: {
            lat: 53.5,
            lng: -2.19,
          },
          postcodes: [],
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
            lat: 53.52,
            lng: -2.2,
          },
          postcodes: [],
        },
      ],
    };
  },
  methods: {
    moveMarker: function (id, latLng) {
      let base = this.markers[0];
      let marker = this.markers[id]

      marker.position = latLng;
      // set postcode on marker move
      this.setPostcodes(marker);

      // get distance betwean base and client
      this.checkDelivery(base, marker);
    },

    setPostcodes: function (marker) {
      fetchPostcodes.getPostcode(marker.position).then((res) => {
        res.json().then((x) => {
          marker.postcodes = x.features;
        });
      });
    },

    setMarker:function(result){
      let base = this.markers[0];
      let marker = this.markers[1]

      marker.position = latLng(result.center[1] , result.center[0])

      this.checkDelivery(base , marker)

    },

    checkDelivery: function (base , marker) {
      if (latLng(base.position).distanceTo(marker.position) < base.radiusInMeters[0].value) {
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
