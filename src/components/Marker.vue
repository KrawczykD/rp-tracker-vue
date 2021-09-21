<template>
    <slot></slot>
</template>

<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','markerid','draggable'],
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
        this.marker = L.marker([this.lat,this.lng],{draggable: this.draggable})
            .on('dragend',()=>{this.resetMarkerPosition()})
            .addTo(this.map.value)  
    },

    resetMarkerPosition:function(){
        this.$emit('moveMarker' , this.markerid , this.marker.getLatLng())
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