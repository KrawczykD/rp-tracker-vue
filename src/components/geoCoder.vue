<template>
  <div :id="id"></div>
</template>
<script>
import MapboxGeocoder from "MapboxGeocoder";

export default {
  name: "geocoder",
  props:['id'],
  mounted: function () {
    const geocoder = new MapboxGeocoder({
      accessToken: window.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
      collapsed: false,
      countries: "GB",
    });

    geocoder.addTo(`#${this.id}`);

    geocoder.on("result", (e)=>{
        this.$emit('search',e.result)
    })
  },
};
</script>

<style scopped>
#geocoder {
  z-index: 999;
}
</style>