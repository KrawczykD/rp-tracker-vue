<script>
export default {
  getPostcode: function (latLng) {
    const query =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      latLng.lng +
      "," +
      latLng.lat +
      `.json?access_token=${window.accessToken}`;

    `https://api.mapbox.com/geocoding/v5/mapbox.places/-2.1929475,53.5020051.json?access_token=${window.accessToken}`;

    fetch(query).then((response) => {
      response.json().then((result) => {
        return result;
        // console.log(result.features);
      });
    });

    return fetch(query);
  },
};
</script>
