<template>
  <LandingLayoutVue>
    <section class="bg-white">
      <div
        class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <div class="place-self-center mr-auto lg:col-span-7">
          <transition name="slide-fade" appear>
          <h1
              class="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-sky-700"
              v-if="showText"
          >
            <!-- <span>{{ dataCarousel }}</span> -->
            Smart <span class="text-yellow-300">Website</span> Assessment and
            <span class="text-yellow-300">Realtime</span>
            Monitoring
          </h1>
        </transition>
          <p
            class="mb-6 max-w-2xl font-medium text-dark lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            Division of Technology Development Ground Control Station
          </p>
          <router-link
            to="/mapview"
            class="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-900"
          >
            Get started
            <!-- <svg
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg> -->
          </router-link>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <transition name="slide-fade-right" appear>
          <img src="../../public/pigeon.png" alt="" />
        </transition>
          <!-- <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          /> -->
        </div>
      </div>
    </section>

    <section class="mine-shaft" id="fitur">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-8 lg:px-6">
        <div class="mb-8 max-w-screen-md lg:mb-16">
          <h2 class="mb-4 text-4xl font-extrabold text-yellow-300">
            Fitur of SWARM
          </h2>
          <p class="text-yellow-300 sm:text-xl">
            Here at SWARM we focus on functional technologies and easy-to-use
            applications.
          </p>
        </div>
        <div
          class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0"
        >
          <div>
            <div
              class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            >
              <!-- <svg
                class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg> -->
              <img src="../../public/way.png" class="h-8 w-8 rounded" alt="" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">Map View</h3>
            <p class="text-white">
              Used to monitor trips and parse trip GPS data
            </p>
          </div>
          <div>
            <div
              class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            >
              <!-- <svg
                class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
                ></path>
              </svg> -->
              <img src="../../public/wasp.png" class="h-8 w-8 rounded" alt="" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">Flight View</h3>
            <p class="text-white">
              Used to display the position of the vehicle and tracker with
              additional height of the vehicle and bearing
            </p>
          </div>
          <div>
            <div
              class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            >
              <!-- <svg
                class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                ></path>
              </svg> -->
              <img
                src="../../public/statistics.png"
                class="h-8 w-8 rounded"
                alt=""
              />
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">
              Statistics Data IMU
            </h3>
            <p class="text-white">
              Used to monitor the triple axis of the vehicle, namely heading,
              roll, pitch
            </p>
          </div>
          <div>
            <div
              class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            >
              <img
                src="../../public/satellite.png"
                class="h-8 w-8 rounded"
                alt=""
              />
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">Antena Tracker</h3>
            <p class="text-white">
              Used to display the tracker location, altitude, and direction
            </p>
          </div>
        </div>
      </div>
    </section>
    <br />
    <br />
  </LandingLayoutVue>
</template>

<script>
import LandingLayoutVue from "@/layouts/LandingLayout.vue";
import { ref, onMounted } from "vue";

export default {
  name: "LandingPage",
  components: {
    LandingLayoutVue,
  },
  setup() {
    const showText = ref(false);

    onMounted(() => {
      setTimeout(() => {
        showText.value = true;
      }, 500);
    });

    return { showText };
  },
};
</script>

<style>
.mine-shaft {
  background-color: #3677b3;
}

/* Transisi dari kiri ke kanan */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 2.5s ease, opacity 2.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Transisi dari kanan ke kiri */
.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
  transition: transform 2.5s ease, opacity 2.5s ease;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>