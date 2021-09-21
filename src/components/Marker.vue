<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','markerid'],
data:function(){
    return{
        marker : null
    }
},

watch:{
    lat(){
        L.marker(this.marker.setLatLng([this.lat,this.lng]))
    },

    lng(){
        this.marker.setLatLng([this.lat,this.lng])
    }
},

mounted:function(){

    this.$nextTick(()=>{

        if(this.map.value){
            this.marker =  L.marker([this.lat,this.lng],{draggable:"true"})
            .on('dragend',()=>{this.$emit('moveMarker' , this.markerid , this.marker.getLatLng())})
            .addTo(this.map.value)  
        }
    })
}}

</script>

<style>

</style>