<template>
  <div class="flex pt-16 overflow-hidden bg-gray-900">
    <SideBarVue :batteryLevel="batteryLevel" />
    <ModalComp :showModal="isModalVisible" />
    <div id="main-content" class="relative w-full h-full overflow-y-auto lg:ml-64 bg-gray-900">
      <slot />
      <FooterCompVue />
    </div>
  </div>
</template>

<script>
import SideBarVue from "@/components/SideBar.vue";
import FooterCompVue from "@/components/FooterComp.vue";
import ModalComp from "@/components/ModalComp.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "AuthenticatedLayout",
  components: {
    SideBarVue,
    FooterCompVue,
    ModalComp,
  },
  setup() {
    const batteryLevel = ref(null);

    // Fetch battery level from API or socket
    axios.get('http://api.example.com/battery')
      .then(response => {
        batteryLevel.value = response.data.level;
      })
      .catch(error => {
        console.error('Error fetching battery level:', error);
      });

    return {
      batteryLevel,
    };
  }
};
</script>

<style scoped>
/* Add styles if needed */
</style>
