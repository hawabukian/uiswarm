<template>
  <div class="my-8">
    <AuthenticatedLayout>
      <div class="md:grid grid-cols-2">
        <div>
          <!-- Hapus bagian informasi signal, baterai, dan time flight -->
          <!-- Bagian ini telah dihapus -->

          <!-- Koor Wahana -->
          <h2 class="mx-6 mt-8 text-white text-sm font-semibold text-center">
            Koordinat Wahana
          </h2>
          <div
            class="mx-6 mb-4 mt-2 grid grid-cols-3 bg-white rounded-md text-center"
          >
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Latitude</span>
              <p v-if="!dataLatitude" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ dataLatitude }}</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Longitude</span>
              <p v-if="!dataLongitude" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ dataLongitude }}</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Altitude</span>
              <p v-if="!dataAltitude" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ dataAltitude }}</p>
            </div>
          </div>

          <!-- Koor Tracker -->
          <h2 class="mx-6 mt-4 text-white text-sm font-semibold text-center">
            Koordinat Tracker
          </h2>
          <div
            class="mx-6 mb-4 mt-2 grid grid-cols-3 bg-white rounded-md text-center"
          >
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Latitude</span>
              <p v-if="gpsTracker[0] == null" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ gpsTracker[0] }}</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Longitude</span>
              <p v-if="gpsTracker[1] == null" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ gpsTracker[1] }}</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Altitude</span>
              <p v-if="gpsTracker[2] == null" class="text-sm">N/A</p>
              <p v-else class="text-sm">{{ gpsTracker[2] }}</p>
            </div>
          </div>

          <!-- Status Tracker -->
          <h2 class="mx-6 mt-4 text-white text-sm font-semibold text-center">
            Status Tracker
          </h2>
          <div
            class="mx-6 mb-4 mt-2 grid grid-cols-4 bg-white rounded-md text-center"
          >
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Bearing</span>
              <p class="text-sm">N/A</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Pitch</span>
              <p class="text-sm">N/A</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Jarak (Horizon)</span>
              <p class="text-sm">N/A</p>
            </div>
            <div class="mx-4 my-2">
              <span class="text-sm font-semibold">Jarak (Live)</span>
              <p class="text-sm">N/A</p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-white font-semibold text-sm mx-auto my-2 mt-2 text-center">
            Flight History
          </p>
          <div class="mx-6 justify-between">
            <p for="" class="text-white text-sm">Import data JSON</p>
            <input
              id="input_json"
              name="input_json"
              type="file"
              ref="fileInput"
              class="text-white bg-slate-600 rounded-md my-4"
              @change="handleFileChange"
              accept=".json"
            />
          </div>
          <div
            class="relative overflow-x-auto shadow-md sm:rounded-lg mx-6 rounded-md"
          >
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Trip ID</th>
                  <th scope="col" class="px-6 py-3">Created At</th>
                  <th scope="col" class="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  v-for="(dataResult, index) in dataResults"
                  :key="index"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {{ dataResult.name }}
                  </th>
                  <td class="px-6 py-4">
                    {{
                      moment(dataResult.createdAt).format(
                        "MMM Do YYYY , h:mm:ss a"
                      )
                    }}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      class="font-medium text-blue-600 dark:text-blue-500 mx-2 hover:underline"
                      @click="getTripId(dataResult.id)"
                    >
                      Export
                    </button>
                    <button
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      @click="replayData(dataResult.id)"
                    >
                      Replay
                    </button>
                    <!-- <a
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      @click="getTripId(dataResult.id)"
                      >Edit</a
                    > -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  </div>
</template>

<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import {
  gpsTracker,
  dataLatitude,
  dataAltitude,
  dataLongitude,

} from "@/utils/socketIo.js";
import moment from "moment";

export default {
  name: "SettingsView",
  components: {
    AuthenticatedLayout,
  },
  methods: {
    moment(arg) {
      return moment(arg);
    },
  },
  setup() {
    const token = localStorage.getItem("x-access-token");

    const dataResults = ref([]);
    const dataGpsWahana = ref([]);
    const trip_id = ref();

    function getTripId(id) {
      trip_id.value = id;
      console.log(id);

      if (token) {
        const config = {
          headers: {
            "x-access-token": token,
          },
        };

        axios
          .get(
            `http://10.252.129.15:1993/api/trip/${trip_id.value}/gpswahana`,
            config
          )
          .then((response) => {
            dataGpsWahana.value = response.data;
            console.log(dataGpsWahana.value);
            exportDataAsJSON(
              dataGpsWahana.value,
              `exportDataGpsWahana${trip_id.value}.json`
            );
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("Token not found in local storage");
      }
    }

    function exportDataAsJSON(data, fileName) {
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(jsonBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }

    onMounted(() => {
      if (token) {
        const config = {
          headers: {
            "x-access-token": token,
          },
        };

        axios
          .get("http://10.252.129.15:1993/api/trip", config)
          .then((response) => {
            dataResults.value = response.data;
            console.log(dataResults.value);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("Token not found in local storage");
      }
    });

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result;
          // Lakukan sesuatu dengan data JSON yang dibaca dari file
          console.log(contents);
        };
        reader.readAsText(file);
      }
    };

    return {
      dataResults,
      dataGpsWahana,
      trip_id,
      getTripId,
      handleFileChange,
      gpsTracker,
      dataLatitude,
      dataAltitude,
      dataLongitude,
    };
  },
};
</script>

<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
}

.container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
}

body {
    background-color: hsl(240, 24%, 16%); /* Sesuaikan dengan warna tema */
}

.container {
    overflow: hidden;
}

</style>
