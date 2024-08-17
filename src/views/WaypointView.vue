<template>
  <AuthenticatedLayout>
    <div class="left">
      <h2 class="text-white mb-4 text-xl font-medium">Tracker View</h2>
      <div class="screen">
        <LMap :zoom="19" :center="[latitude, longitude]" @click="onMapClick">
          <LTileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <LMarker
            :lat-lng="[trackerLatitude, trackerLongitude]"
            :rotation-angle="dataBearing"
          >
            <LIcon
              :icon-size="dynamicSize"
              :icon-anchor="dynamicAnchor"
              icon-url="ikon-gcs-1.png"
            ></LIcon>
          ></LMarker>
          <LPolyline :lat-lngs="polylineLatLong" :color="polylineColor"></LPolyline>
        </LMap>
      </div>
    </div>

    <div class="mx-5 grid grid-cols-4 gap-2">
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Latitude</span>
          <span v-if="!dataLatitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ dataLatitude }}</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Longitude</span>
          <span v-if="!dataLongitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ dataLongitude }}</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Altitude</span>
          <span v-if="!dataAltitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ dataAltitude }} meter</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Bearing</span>
          <span v-if="!dataBearing" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ dataBearing }} °</span>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import "leaflet/dist/leaflet.css";
import { watch, ref } from "vue";
import io from "socket.io-client";
import {
  LMap,
  LTileLayer,
  LPolyline,
  LIcon,
  LMarker,
} from "@vue-leaflet/vue-leaflet";

export default {
  name: "WaypointView",
  components: {
    AuthenticatedLayout,
    LMap,
    LTileLayer,
    LPolyline,
    LIcon,
    LMarker,
  },
  setup() {
    const socket = io("https://gcsapi.inbework.site");
    const connected = ref(false);

    const latitude = ref(-7.27679292068812);
    const longitude = ref(112.79495179653168);
    const trackerLatitude = ref(-7.27679292068812);
    const trackerLongitude = ref(112.7949180653168);

    const dataLatitude = ref("");
    const dataLongitude = ref("");
    const dataAltitude = ref("");
    const dataBearing = ref("");

    const polylineColor = "yellow";
    const polylineLatLong = ref([]);
    const polyline = ref({
      latlngs: [],
    });

    const result = ref("");

    socket.on("connect", () => {
      console.log("Socket.IO connected!");
      connected.value = true;

      socket.on("outputGpsWahana", (data) => {
        const dataSocket = JSON.parse(data);
        console.log("Data received from socket:", dataSocket);

        trackerLatitude.value = dataSocket.latitude;
        trackerLongitude.value = dataSocket.longitude;

        dataLatitude.value = dataSocket.latitude;
        dataLongitude.value = dataSocket.longitude;
        dataAltitude.value = dataSocket.altitude;
        dataBearing.value = dataSocket.bearing;

        polylineLatLong.value.push([
          parseFloat(dataSocket.latitude),
          parseFloat(dataSocket.longitude),
        ]);
      });
    });

    const updatePolyline = (latitude, longitude) => {
      polylineLatLong.value.push([parseFloat(latitude), parseFloat(longitude)]);
    };

    const onMapClick = (event) => {
      const latlng = event.latlng;
      trackerLatitude.value = latlng.lat;
      trackerLongitude.value = latlng.lng;
      updatePolyline(latlng.lat, latlng.lng);
    };

    watch(polylineLatLong, (newVal) => {
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
      trackerLatitude,
      trackerLongitude,
      polylineLatLong,
      onMapClick,
      result,
      iconSize: 64,
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
};
</script>

<style>
.screen {
  height: 80vh; /* Tinggi 100% dari tinggi viewport */
  width: 80vw;  /* Lebar 100% dari lebar viewport */
}

.left {
  margin: 0; /* Menghilangkan margin */
  height: 90vh; /* Tinggi 100% dari tinggi viewport */
}

</style>
