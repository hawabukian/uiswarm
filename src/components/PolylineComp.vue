<template>
  <LPolyline :lat-lngs="polylineLatLong" :color="polylineColor" />
</template>
  
  <script>
import "leaflet/dist/leaflet.css";
import { LPolyline } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LPolyline,
  },
  props: {
    polylineLatLong: {
      type: Array,
      default: () => [],
    },
    polylineColor: {
      type: String,
      default: "blue",
    },
  },
};
</script>
  
  <style>
.map-container {
  height: 400px;
}
</style>
  