<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','long'],
data:function(){
    return{
        marker : null
    }
},

watch:{
    lat(){
        L.marker(this.marker.setLatLng([this.lat,this.long]))
    },

    long(){
        this.marker.setLatLng([this.lat,this.long])
    }
},

mounted:function(){

    this.$nextTick(()=>{

        if(this.map.value){
            this.marker =  L.marker([this.lat,this.long]).addTo(this.map.value)
        
          
        }
    })
}}

</script>

<style>

</style>