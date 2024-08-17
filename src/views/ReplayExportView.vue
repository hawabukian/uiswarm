<template>
  <AuthenticatedLayout>
    <div class="left">
      <div class="flex justify-between">
        <h2 class="text-white mb-4 text-xl font-medium">Replay</h2>

        <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
          class="text-gray-300 bg-gray-800 font-medium rounded-lg text-sm px-5 my-3 text-center inline-flex items-center"
          type="button">
          Maps
          <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdownHover" class="z-10 hidden bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul class="py-2 text-sm text-gray-300 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-600 dark:hover:text-white"
                @click="changeMaps(0)">Roadmap</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-600 dark:hover:text-white"
                @click="changeMaps(1)">Satellite</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-600 dark:hover:text-white"
                @click="changeMaps(2)">Topografi</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full h-screen">
        <LMap :zoom="maps.size" :center="[selectedLatitude, selectedLongitude]">
          <LTileLayer :url="maps.map" />

          <LMarker :lat-lng="[replayLatitude, replayLongitude]">
            <LIcon :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" icon-url="ikon-quadcopter.png"
              style="transform: rotate(45deg)"></LIcon>
          </LMarker>
          <LMarker :lat-lng="[homeLatitude, homeLongitude]">
            <LPopup>Home!</LPopup>
          </LMarker>

          <LPolyline :lat-lngs="polyline.latlngs" :color="polylineColor"></LPolyline>
        </LMap>
      </div>
    </div>

    <div class="mx-5 grid grid-cols-4 gap-2">
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Latitude</span>
          <span v-if="!replayLatitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ replayLatitude }}</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Longitude</span>
          <span v-if="!replayLongitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ replayLongitude }}</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Altitude</span>
          <span v-if="!replayAltitude" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ replayAltitude }} meter</span>
        </div>
      </div>
      <div>
        <div class="bg-gray-800 rounded text-gray-300 p-2">
          <span class="text-bold text-lg mx-2">Bearing</span>
          <span v-if="!replayBearing" class="ms-10">N/A</span>
          <span v-else class="ms-10">{{ replayBearing }} °</span>
        </div>
      </div>
    </div>

    <div class="mx-5 grid grid-cols-3 text-white my-4">
      <div class="mt-3 mr-4">
        <button v-if="angkaDepan <= 0" type="button"
          class="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded text-sm px-5 py-4 text-center mr-2 mb-2"
          @click="playRecord">
          <span class="text-yellow-300 hover:text-yellow-200 text-md font-bold">PLAY SIMULATION</span>
        </button>
        <button v-else type="button"
          class="text-white w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 font-medium rounded text-sm px-5 py-4 text-center mr-2 mb-2"
          @click="playRecord" disabled>
          <span class="text-white-300 hover:text-white-200 text-md font-bold">SIMULATION ON PROGRESS</span>
        </button>
      </div>
      <div class="row-span-2 col-span-2">
        <div class="mb-1">
          <span class="text-sm font-medium text-white">Progress</span>
        </div>

        <div class="w-full bg-gray-400 rounded dark:bg-gray-700">
          <div class="bg-yellow-300 text-xs font-medium text-sky-800 text-center p-1.5 leading-none rounded"
            :style="{ width: angkaDepan + '%' }">
            {{ angkaDepan }} %
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import "leaflet/dist/leaflet.css";
import { watch, ref } from "vue";
// import io from "socket.io-client";
import {
  LMap,
  LTileLayer,
  LPolyline,
  LIcon,
  LMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import {
  latitude,
  longitude,
  selectedLatitude,
  selectedLongitude,
  axisData,
  dataLatitude,
  dataLongitude,
  dataAltitude,
  dataBearing,
  polyline,
  polylineColor,
  polylineLatLong,
  result,
  gpsTracker,
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
    LPopup,
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
    const replayLatitude = ref("");
    const replayLongitude = ref("");
    const replayAltitude = ref("");
    const replayBearing = ref("");

    const homeLatitude = ref("");
    const homeLongitude = ref("");

    const dataPolyline = ref();
    const dataAxis = ref();
    const firstDataPolyline = ref();
    const firstDataAxis = ref();

    const dataProgression = ref(0);
    const angkaDepan = ref(0);

    const dataMap = [
      {
        map: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
        size: 19,
      },
      {
        map: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
        size: 19,
      },
      {
        map: "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
        size: 11,
      },
    ];

    let i = 0;
    let k = 1;
    let status = 0;

    firstDataPolyline.value = polyline.value.latlngs[0];
    firstDataAxis.value = axisData.value[0];
    console.log(axisData.value);

    for (let j = 0; j < firstDataPolyline.value.length; j++) {
      // ITERASI LATLONG GPS
      replayLatitude.value = firstDataPolyline.value[0];
      replayLongitude.value = firstDataPolyline.value[1];

      //HOME LATLONG GPS
      if (status <= 0) {
        homeLatitude.value = firstDataPolyline.value[0];
        homeLongitude.value = firstDataPolyline.value[1];
        status++;
      }
      // ITERASI ALTITUDE BEARING
      replayAltitude.value = firstDataAxis.value[0];
      replayBearing.value = firstDataAxis.value[1];
    }

    const maps = ref({
      map: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      size: 19,
    });

    function changeMaps(index) {
      maps.value = dataMap[index];
      console.log(maps.value);
      return maps;
    }
    function playRecord() {
      if (i < polyline.value.latlngs.length) {
        dataPolyline.value = polyline.value.latlngs[i];
        dataAxis.value = axisData.value[i];

        dataProgression.value = (k / polyline.value.latlngs.length) * 100;
        angkaDepan.value = dataProgression.value.toFixed(0);

        for (let j = 0; j < dataPolyline.value.length; j++) {
          replayAltitude.value = dataAxis.value[0];
          replayBearing.value = dataAxis.value[1];

          replayLatitude.value = dataPolyline.value[0];
          replayLongitude.value = dataPolyline.value[1];
        }

        i++;
        k++;

        setTimeout(playRecord, 50);
      }
    }

    const updatePolyline = (latitude, longitude) => {
      polylineLatLong.value.push([parseFloat(latitude), parseFloat(longitude)]);
    };

    const onMapClick = (event) => {
      const latlng = event.latlng;
      selectedLatitude.value = latlng.lat;
      selectedLongitude.value = latlng.lng;
      updatePolyline(latlng.lat, latlng.lng);
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
      gpsTracker,
      axisData,
      replayLatitude,
      replayLongitude,
      replayAltitude,
      replayBearing,
      homeLatitude,
      homeLongitude,
      firstDataPolyline,
      dataProgression,
      angkaDepan,
      playRecord,
      changeMaps,
      maps,
      rotation: 45,
      iconSize: 35,
    };
  },
};
</script>

<style>
.screen {
  height: 600px;
  width: 1350px;
}

.left {
  margin: 20px 20px 20px;
}

.leaflet-top {
  z-index: 0;
}

.leaflet-pane {
  z-index: 0;
}
</style>
