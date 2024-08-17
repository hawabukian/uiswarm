<template>
  <nav class="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <router-link to="/" class="flex ml-2 md:mr-24">
            <img src="../../public/logo-efrisa.png" class="mr-3 h-8" alt="Logo" />
          </router-link>
        </div>

        <div class="mt-1 p-1 bg-gray-700 rounded-md text-white">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <img src="../../public/battery.png" class="w-8 h-6 mx-auto text-white" alt="Battery" />
              <p class="text-sm">N/A</p>
            </div>
            <div>
              <p class="text-sm font-semibold">Time Flight</p>
              <p class="text-sm">00:00</p>
            </div>
            <div>
              <!-- Ganti SVG sinyal dengan gambar -->
              <img src="../../public/signal.png" class="w-9 h-6 mx-auto text-white" alt="Signal" />
              <p class="text-sm">N/A</p>
            </div>
          </div>
        </div>


        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
              aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <span class="sr-only">Open user menu</span>
              <div class="rounded-full px-2 py-2 bg-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <g fill="currentColor">
                    <circle cx="12" cy="6" r="4" />
                    <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"
                      opacity=".5" />
                  </g>
                </svg>
              </div>
            </button>
            <div class="z-50 hidden my-4 text-base list-none divide-y rounded shadow bg-gray-700 divide-gray-600"
              id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-white" role="none">{{ userName }}</p>
                <p class="text-sm font-medium truncate text-gray-300" role="none">{{ userEmail }}</p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    role="menuitem" @click="logout">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
    aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <br />
          <router-link
            :to="'/mapview'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'mapview' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'mapview'">
            <img src="../../public/way.png" class="h-6 w-6" alt="Map View" />
            <span class="ml-3">Map View</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="'/dataimu'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'dataimu' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'dataimu'">
            <img src="../../public/statistics.png" class="h-6 w-6" alt="Data Imu" />
            <span class="ml-3">Data Imu</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="'/flight'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'flightview' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'flightview'">
            <img src="../../public/wasp.png" class="h-6 w-6" alt="Flight View" />
            <span class="ml-3">Flight View</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="'/waypoint'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'antenatracker' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'antenatracker'">
            <img src="../../public/satellite.png" class="h-6 w-6" alt="Antena Tracker" />
            <span class="ml-3">Antena Tracker</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link
            :to="'/combinedview'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'combinedview' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'combinedview'">
            <img src="../../public/statistics.png" class="h-6 w-6" alt="combinedview" />
            <span class="ml-3">Combined View</span>
          </router-link>
        </li> -->
        <hr />
        <li>
          <router-link
            :to="'/settings'"
            :class="['group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700', activeMenuItem === 'setting' ? 'bg-yellow-400 text-black' : '']"
            @click.stop.prevent="activeMenuItem = 'setting'">
            <svg class="w-6 h-6 transition duration-75 text-white" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z">
              </path>
            </svg>
            <span class="ml-3">Settings</span>
          </router-link>
        </li>
        <ConnectModal @show-modal="showModal" />
      </ul>
    </div>
  </aside>
</template>

<script>
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { token, userId } from "@/utils/helper.js";
import { useRouter } from "vue-router";
import ConnectModal from "@/components/ConnectModal.vue";
import axios from "axios";
import { wahanaInformation } from "@/utils/socketIo.js";

export default {
  name: "SideBar",
  components: {
    ConnectModal,
  },
  setup() {
    const router = useRouter();
    const userEmail = ref("");
    const userName = ref("");
    const activeMenuItem = ref('');
    const battery = ref(null);
    const timeFlight = ref(null);
    const signal = ref(null);

    const logout = () => {
      localStorage.removeItem("x-access-token");
      localStorage.removeItem("userId");
      router.push({ name: "landing" });
    };

    onMounted(async () => {
      initFlowbite();

      // Fetch user info
        try {
          const response = await axios.get(`http://10.252.129.15:1993/api/user/${userId.value}`, {
            headers: {
              "x-access-token": token.value,
        },
      });
        userName.value = response.data.username;
        userEmail.value = response.data.email;
      } catch (error) {
        console.error(error);
      }

      // Fetch wahana information
      battery.value = wahanaInformation[0];
      timeFlight.value = wahanaInformation[1];
      signal.value = wahanaInformation[2];
    });

    return { battery, timeFlight, signal, activeMenuItem, userName, userEmail, logout };
  },
};
</script>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Pastikan navbar berada di atas */
}

.sidebar {
  position: fixed;
  top: 50px; /* Memberikan jarak dari navbar */
  left: 0;
  height: calc(100vh - 50px); /* Sesuaikan tinggi sidebar */
  width: 200px;
  background-color: #212529;
  z-index: 999; /* Sidebar di bawah navbar */
}

.main-content {
  margin-left: 200px;
  margin-top: 50px; /* Memberikan jarak dari navbar */
  width: calc(100% - 200px);
  z-index: 998;
}

@media (max-width: 768px) {
  .sidebar {
    width: 160px;
  }

  .main-content {
    margin-left: 160px;
    width: calc(100% - 160px);
  }
}

@media (max-width: 640px) {
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }
}

</style>