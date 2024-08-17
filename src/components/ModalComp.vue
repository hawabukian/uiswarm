<template>
  <div>
    <!-- Main modal -->
    <div id="crypto-modal" tabindex="-1" aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
          <button type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="crypto-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <!-- Modal header -->
          <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-base font-semibold text-gray-700 lg:text-xl dark:text-white">
              Flight Pass Checklist
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6">
            <ul class="mb-8">
              <li>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="connected == true">
                  <img src="../../public/passed.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-green-500">Socket Is Connected</span>
                </a>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="connected == false">
                  <img src="../../public/disable.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-red-500">Socket Disconnected</span>
                </a>
              </li>
              <li>
                <a href=""
                  class="flex items-center p-2 mb-2 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <img src="../../public/warning.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 text-orange-500 text-base font-bold">Hardware
                    <span class="text-xs font-medium text-gray-800">
                      Props mounted? Wings secured? Tail secured?</span>
                  </span>
                </a>
              </li>
              <li>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="wahanaInformation != []">
                  <img src="../../public/warning.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-orange-500">Battery
                    <span class="text-xs font-medium text-gray-800">
                      Battery connector firmly plugged?</span>
                  </span>
                </a>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="wahanaInformation == []">
                  <img src="../../public/pass.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-green-500">Battery
                    <span class="text-xs font-medium text-gray-800">
                      passed</span>
                  </span>
                </a>
              </li>
              <li>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="axisData == ''">
                  <img src="../../public/disable.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-red-500">Sensors
                    <span class="text-xs font-medium text-gray-800">
                      Sensors data is sended?</span></span>
                </a>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="axisData != ''">
                  <img src="../../public/passed.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-green-500">Sensors
                    <span class="text-xs font-medium text-gray-800">
                      Passed</span></span>
                </a>
              </li>
              <li>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="polylineLatLong != ''">
                  <img src="../../public/passed.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-green-500">GPS Wahana
                    <span class="text-xs font-medium text-gray-800">
                      Passed</span></span>
                </a>
                <a href=""
                  class="flex items-center p-2 mb-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  v-if="polylineLatLong == ''">
                  <img src="../../public/disable.png" class="h-6 w-6" alt="" />
                  <span class="flex-1 ml-3 whitespace-nowrap text-red-500">GPS Wahana
                    <span class="text-xs font-medium text-gray-800">
                      GPS data was sended?</span></span>
                </a>
              </li>
            </ul>
            <div>
              <a href="#"
                class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                Please check your flight pass!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import {
  connected,
  polyline,
  axisData,
  gpsTracker,
  polylineLatLong,
  wahanaInformation,
} from "@/utils/socketIo.js";
export default {
  name: "ModalComp",
  setup() {
    onMounted(() => {
      initFlowbite();
    });

    const showModal = () => {
      // Mengirimkan event untuk menampilkan modal
      // Anda dapat menggunakan ref atau emit untuk mengirim event ini ke komponen induk
      // contoh menggunakan emit:
      this.$emit("show-modal");
    };

    return {
      showModal,
      connected,
      polylineLatLong,
      wahanaInformation,
      polyline,
      axisData,
      gpsTracker,
    };
  },
};
</script>

<style></style>