<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','markerid','draggable'],
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
    },

    draggable(){
        this.marker.remove()
        this.createMarker()
    }
},

methods:{
    createMarker:function(){
        this.marker =  L.marker([this.lat,this.lng],{draggable: this.draggable})
            .on('dragend',()=>{this.$emit('moveMarker' , this.markerid , this.marker.getLatLng())})
            .addTo(this.map.value)  
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