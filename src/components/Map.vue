<template>
   <div :style="{height: mapheight , width: mapwidth}" :id="mapid"><slot></slot></div>
</template>

<script>
import L from 'leaflet'
import {computed} from 'vue'

export default {
    mounted:function(){
        this.mapInit()      
    },
    props:['mapid','mapheight','mapwidth'],
    data:function(){
        return{
            map: null
        }
    },
    provide:function(){
        return {
            map : computed(()=> this.map)
        }
    },

    methods:{
        mapInit:function(){
        this.map = L.map(this.mapid).setView([53.50, -2.19], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiYm9va2luZ29ubGluZSIsImEiOiJja2Job2U3MDUwN2ExMnRxdm53Njd3MXEzIn0.KDd8MAU8eEW0EHi9Vfn7wA"
        }).addTo(this.map);
        }
    }
}
</script>

<style>

</style>