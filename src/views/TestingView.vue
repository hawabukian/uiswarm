<template>
  <AuthenticatedLayoutVue>
    <div class="bg-white justify-center">
      <img src="gooogle.png" class="text-center" alt="" />
      <p class="text-red-400">Halo ini testing</p>
    </div>
  </AuthenticatedLayoutVue>
</template>

<script>
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";

export default {
  nama: "Tes",
  components: {
    AuthenticatedLayoutVue,
  },
};
</script>

<style>
</style>