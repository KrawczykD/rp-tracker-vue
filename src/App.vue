<template>
  <h1 class="text-center">HELLO WORLD! RP TRACKER APP</h1>
  <h2 :class="['text-center', isInRange ? 'btn-success' : 'btn-danger']">{{isInRange ? 'Grate news! We can delivery to your address!' : 'Bad news! We can NOT delivery to your address :('}}</h2>
  <ul v-for="(marker, index) in markers" :key="index" class="list">
    <li v-for="(postcode, index) in marker.postcodes" :key="index">
      {{postcode.place_name}}
    </li>
  </ul>
  <div class="d-flex justify-content-center align-items-center">
    <br /><br />
    <button
      :class="['btn m-2', markers[1].isMarkerDraggable ? 'btn-success' : 'btn-danger']"
      :key="index"
      v-on:click="markers[1].isMarkerDraggable = !markers[1].isMarkerDraggable"
      v-html="
        `Base marker is ${markers[1].isMarkerDraggable ? 'draggable' : 'non draggable'}`
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
import fetchPostcodes from './components/fetchPostcodes.vue'


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
      isInRange: false,
      markers: [
        {
          id: 0,
          isMarkerDraggable: true,
          position: {
            lat: 53.5,
            lng: -2.19,
          },
          postcodes:[]
        },
        {
          id: 1,
          isMarkerDraggable: false,
          position: {
            lat: 53.52,
            lng: -2.2,
          },
          radiusInMeters: [{value:2000 ,color:"#FF0000" }, {value:800 ,color:"#00FF00" }, {value:500 ,color:"#0000FF" }],
          postcodes:[]
        },
      ],
    };
  },
  methods: {
    moveMarker: function (id, latLng) {
      let base = this.markers[1]

      this.markers[id].position = latLng;
        // set postcode on marker move
       this.setPostcodes(id ,latLng)

        // get distance betwean base and client
        this.checkDelivery(base , latLng)
    },

    setPostcodes:function(id , latLng){
        fetchPostcodes.getPostcode(latLng).then(res=>{
           res.json()
           .then(x=>{
             this.markers[id].postcodes =  x.features
           })
         })
    },

    checkDelivery:function(base, latLng){
      if(latLng.distanceTo(base.position) < base.radiusInMeters[0].value){
        this.isInRange = true
      } else {
        this.isInRange = false
      }
     }
  },
};
</script>

<style>
#mapid {
  height: 100vh;
}
</style>
