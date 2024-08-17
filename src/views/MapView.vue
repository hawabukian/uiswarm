<template>
  <AuthenticatedLayout>
    <div class="grid gap-4">
      <div class="screen w-full">
        <LMap :zoom="19" :center="[latitude, longitude]" @click="onMapClick">
          <LTileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          <LMarker :lat-lng="[selectedLatitude, selectedLongitude]">
            <LIcon :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" icon-url="ikon-quadcopter.png"></LIcon>
          </LMarker>
          <LPolyline :lat-lngs="polyline.latlngs" :color="polylineColor"></LPolyline>
        </LMap>
      </div>
      <div class="mx-5 grid grid-cols-5 gap-2">
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
            <span class="text-bold text-lg mx-2">Altitude</span>
            <span v-if="!dataAltitude" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataAltitude }} meter</span>
          </div>
        </div>
        <div class="bg-white rounded">
          <span class="text-bold text-lg mx-1">Barometer</span>
          <span v-if="!dataBarometer" class="ms-5">N/A</span>
          <span v-else class="ms-2">{{ dataBarometer }} hPa</span>
        </div>
        <div>
          <div class="bg-white rounded">
            <span class="text-bold text-lg mx-2">Bearing</span>
            <span v-if="!dataBearing" class="ms-10">N/A</span>
            <span v-else class="ms-10">{{ dataBearing }} °</span>
          </div>
        </div>
      </div>
      <div id="glg_area" class="glg_wrapper" style="width: 100%; height: 300px; background-color: white; padding: 0px">
        <div id="loader_container">
          <div id="loader"></div>
        </div>
      </div>
      <p style="display: none" id="altitude">{{ dataAltitude }}</p>
      <p style="display: none" id="heading"></p>
      <p style="display: none" id="pitch"></p>
      <p style="display: none" id="roll"></p>
    </div>
  </AuthenticatedLayout>
</template>

<script>
var heading, pitch, roll;
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import "leaflet/dist/leaflet.css";
import { watch } from "vue";
// import io from "socket.io-client";
import { LMap, LTileLayer, LPolyline, LIcon, LMarker } from "@vue-leaflet/vue-leaflet";
import {
  latitude,
  longitude,
  selectedLatitude,
  selectedLongitude,
  dataLatitude,
  dataLongitude,
  dataAltitude,
  dataBearing,
  dataBarometer,
  headingData,
  rollData,
  pitchData,
  parseDataImu,
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

  mounted() {
    // Load your scripts when the component is mounted
    this.loadScripts([
      "GlgDemo.js",
      "GlgToolkitDemo.js",
      "gunzip.min.js",
      "avionics_demo.js",
    ])
      .then(() => {
        this.initializeComponent();
      })
      .catch((error) => {
        console.error("Error loading scripts:", error);
      });
  },
  methods: {
    loadScript(src) {
      return new Promise((resolve) => {
        try {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(src);
          script.onerror = () => {
            console.error(`Failed to load script ${src}`);
            resolve(src); // Resolve the promise anyway
          };
          document.head.appendChild(script);
        } catch (error) {
          console.error(`Error loading script ${src}:`, error);
          resolve(src); // Resolve the promise anyway
        }
      });
    },

    loadScripts(scripts) {
      let promise = Promise.resolve();
      scripts.forEach((src) => {
        promise = promise.then(() => this.loadScript(src));
      });
      return promise;
    },
    initializeComponent() {
      // Your component initialization logic that depends on the scripts goes here
    },
  },


  setup() {
    // const socket = io("https://gcsapi.inbework.site");
    // const connected = ref(false);

    // const latitude = ref(-7.27679292068812);
    // const longitude = ref(112.79495179653168);
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

    watch(headingData, (newValue) => {
      heading = newValue[newValue.length - 1].toString().replace(/^,/, '')
      document.getElementById("heading").innerText = heading
      // console.log(Updated heading: ${heading});
    }, { deep: true });

    watch(pitchData, (newValue) => {
      pitch = newValue[newValue.length - 1].toString().replace(/^,/, '')
      document.getElementById("pitch").innerText = pitch
      // console.log(Updated pitch: ${pitch});
    }, { deep: true });

    watch(rollData, (newValue) => {
      roll = newValue[newValue.length - 1].toString().replace(/^,/, '')
      document.getElementById("roll").innerText = roll
      // console.log(Updated roll: ${roll});
    }, { deep: true });

    return {
      dataLatitude,
      dataLongitude,
      dataAltitude,
      dataBearing,
      dataBarometer,
      headingData,
      heading,
      rollData,
      roll,
      pitchData,
      pitch,
      parseDataImu,
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

#glg_area {
  position: absolute;
  top: 280px;
  /* Pindahkan lebih ke bawah */
  left: 0px;
  /* Geser sedikit ke kanan */
  width: 70%;
  /* Ubah lebar */
  height: 50px;
  /* Ubah tinggi */
  background-color: #f0f0f0;
  /* Ubah warna latar */
  padding: 0px;
  /* Tambahkan padding */
  z-index: 10;
}

#loader_container {
  position: relative;
  top: 20px; /* Geser ke bawah */
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loader {
  border: 20px solid #f3f3f3;
  /* Ubah ketebalan border */
  border-radius: 50%;
  border-top: 20px solid #3498db;
  /* Ubah ketebalan border atas */
  width: 140px;
  /* Ubah lebar */
  height: 140px;
  /* Ubah tinggi */
  margin-top: 0px;
  animation: loader_spin 3s linear infinite;
  /* Ubah kecepatan animasi */
}

@keyframes loader_spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>