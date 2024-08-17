<template>
  <AuthenticatedLayoutVue>
    <div class="screen w-full">
      <LMap :zoom="20" :center="[latitude, longitude]" @click="onMapClick">
        <LTileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <LMarker :lat-lng="[selectedLatitude, selectedLongitude]">
          <LIcon
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
            icon-url="ikon-quadcopter.png"
          ></LIcon
        ></LMarker>
        <LPolyline
          :lat-lngs="polyline.latlngs"
          :color="polylineColor"
        ></LPolyline>
      </LMap>
    </div>
    <div class="ms-5 my-10">
      <p class="text-white">Result RAW data from Socket</p>
      <span class="text-white"> {{ polyline }}</span>
    </div>
  </AuthenticatedLayoutVue>
</template>

<script>
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import "leaflet/dist/leaflet.css";

import {
  LMap,
  LTileLayer,
  LPolyline,
  LIcon,
  LMarker,
} from "@vue-leaflet/vue-leaflet";

import {
  latitude,
  longitude,
  selectedLatitude,
  selectedLongitude,
  polyline,
  polylineColor,
  polylineLatLong,
  result,
  onMapClick,
  updatePolyline,
} from "@/utils/socketIo.js";
export default {
  name: "FlightView",
  components: {
    AuthenticatedLayoutVue,
    LMap,
    LTileLayer,
    LPolyline,
    LIcon,
    LMarker,
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },

  setup() {
    // console.log(polyline);
    function prettyLog(data) {
      var str = JSON.stringify(data, null, 2);
      console.log(str);
    }
    return {
      latitude,
      longitude,
      selectedLatitude,
      selectedLongitude,
      onMapClick,
      polyline,
      polylineColor,
      polylineLatLong,
      updatePolyline,
      prettyLog,
      result,
      iconSize: 64,
    };
  },
};
</script>

<style>
.screen {
  height: 600px;
}
</style>