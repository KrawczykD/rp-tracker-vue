<script>

import L from 'leaflet'

export default {
inject:['map'],
props:['lat','lng','radius'],
data:function(){
    return{
        circle : null,
    }
},

watch:{
    lat(){
        this.circle.setLatLng([this.lat,this.lng])
    },

    lng(){
        this.circle.setLatLng([this.lat,this.lng])
    },


    
},

methods:{
    createCircle:function(){
        this.circle = L.circle([this.lat,this.lng],{radius: this.radius})
        .addTo(this.map.value)  

    },
},

mounted:function(){

    this.$nextTick(()=>{

        if(this.map.value){
            if(this.radius){
                this.createCircle()
            }
        }
    })
}}

</script>

<style>

</style>