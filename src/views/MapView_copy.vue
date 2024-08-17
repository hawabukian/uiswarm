<template>
  <AuthenticatedLayout>
    <div class="grid gap-4">
      <div class="screen w-full">
        <LMap :zoom="19" :center="[latitude, longitude]" @click="onMapClick">
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
      <div class="mx-5 grid grid-cols-4 gap-2">
        <div>
          <div class="bg-white rounded">
            <span class="text-bold text-lg mx-2">Latitude</span>
            <span v-if="!dataLatitude" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataLatitude }}</span>
          </div>
        </div>
        <div>
          <div class="bg-white rounded">
            <span class="text-bold text-lg mx-2">Longitude</span>
            <span v-if="!dataLongitude" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataLongitude }}</span>
          </div>
        </div>
        <div>
          <div class="bg-white rounded">
            <span class="text-bold text-lg mx-2">Barometer</span>
            <span v-if="!dataBarometer" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataBarometer }} meter</span>
          </div>
        </div>
        <div>
          <div class="bg-white rounded">
            <span class="text-bold text-lg mx-2">Bearing</span>
            <span v-if="!dataBearing" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataBearing }} °</span>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import "leaflet/dist/leaflet.css";
import { watch } from "vue";
// import io from "socket.io-client";
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
  dataLatitude,
  dataLongitude,
  dataAltitude,
  dataBarometer,
  dataBearing,
  polyline,
  polylineColor,
  polylineLatLong,
  result,
} from "@/utils/socketIo.js";

export default {
  name: "MapView",
  components: {
    AuthenticatedLayout,
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
    // const socket = io("https://gcsapi.inbework.site");
    // const connected = ref(false);

    // const latitude = ref(-7.27679292068812);
    // const longitude = ref(1 nbbnb12.79495179653168);
    // const selectedLatitude = ref(-7.27679292068812);
    // const selectedLongitude = ref(112.7949180653168);

    // const dataLatitude = ref("");
    // const dataLongitude = ref("");
    // const dataAltitude = ref("");
    // const dataBearing = ref("");

    // const polylineColor = "yellow";
    // const polylineLatLong = ref([]);
    // const polyline = ref({
    //   latlngs: [],
    // });

    // const result = ref("");

    // socket.on("connect", () => {
    //   console.log("Socket.IO connected!");
    //   connected.value = true;

    //   socket.on("outputGpsWahana", (data) => {
    //     result.value += JSON.parse(data);
    //     const dataSocket = JSON.parse(data);

    //     selectedLatitude.value = dataSocket.latitude;
    //     selectedLongitude.value = dataSocket.longitude;

    //     dataLatitude.value = dataSocket.latitude;
    //     dataLongitude.value = dataSocket.longitude;
    //     dataAltitude.value = dataSocket.altitude;
    //     dataBearing.value = dataSocket.bearing;

    //     polylineLatLong.value.push([
    //       parseFloat(dataSocket.latitude),
    //       parseFloat(dataSocket.longitude),
    //     ]);

    //     // console.log(dataSocket.latitude);
    //     // prettyLog(polyline.value.latlngs);
    //   });
    // });

    const updatePolyline = (latitude, longitude) => {
      polylineLatLong.value.push([parseFloat(latitude), parseFloat(longitude)]);
    };

    const onMapClick = (event) => {
      const latlng = event.latlng;
      selectedLatitude.value = latlng.lat;
      selectedLongitude.value = latlng.lng;
      updatePolyline(latlng.lat, latlng.lng);

      // prettyLog(polylineLatLong.value);
    };

    watch([polylineLatLong.value], (newVal) => {
      polyline.value.latlngs = newVal;
    });

    return {
      dataLatitude,
      dataLongitude,
      dataAltitude,
      dataBearing,
      latitude,
      longitude,
      polyline,
      polylineColor,
      selectedLatitude,
      selectedLongitude,
      polylineLatLong,
      onMapClick,
      result,
      iconSize: 64,
    };
  },
};
</script>

<style>
.screen {
  height: 300px;
}
</style>
