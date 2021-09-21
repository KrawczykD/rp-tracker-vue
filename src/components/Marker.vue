<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','markerid','draggable'],
data:function(){
    return{
        marker : null,
        circle0 : null,
        circle1 : null,
        circle2 : null,
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

        this.circle0 = L.circle([this.lat,this.lng],{radius: 700})
        .addTo(this.map.value)  

        this.circle1 = L.circle([this.lat,this.lng],{radius: 1200})
        .addTo(this.map.value)  

        this.circle2 = L.circle([this.lat,this.lng],{radius: 2000})
        .addTo(this.map.value)  

    },

    resetMarkerPosition:function(){
        this.$emit('moveMarker' , this.markerid , this.marker.getLatLng())
        this.circle0.setLatLng([this.lat,this.lng])
        this.circle1.setLatLng([this.lat,this.lng])
        this.circle2.setLatLng([this.lat,this.lng])
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