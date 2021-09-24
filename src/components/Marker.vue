<template>
    <slot></slot>
</template>

<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','draggable','icon'],
data:function(){
    return{
        marker : null,
    }
},

watch:{
    lat(){
        L.marker(this.marker.setLatLng([this.lat,this.lng]))
    },

    lng(){
        this.marker.setLatLng([this.lat,this.lng])
    },

    draggable(){
        this.marker.remove()
        this.createMarker()
    },

    
},

methods:{
    createMarker:function(){
        var myIcon = L.divIcon({className:this.icon});

        this.marker = L.marker([this.lat,this.lng],{draggable: this.draggable , icon: myIcon})
            .on('dragend',()=>{this.resetMarkerPosition()})
            .addTo(this.map.value)  
    },

    resetMarkerPosition:function(){
        this.$emit('moveMarker', this.marker.getLatLng())
    }
},

mounted:function(){

    this.$nextTick(()=>{

        if(this.map.value){
            this.createMarker()
        }
    })
}}

</script>

<style>

</style>