<template>
  <div>
    <button type="button" data-modal-target="crypto-modal" data-modal-toggle="crypto-modal"
      class="w-full group flex items-center rounded-lg p-2 text-base text-white hover:bg-gray-700" @click="showModal">
      <img src="../../public/pass.png" class="h-6 w-6" alt="" />
      <!-- <svg
        aria-hidden="true"
        class="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        ></path>
      </svg> -->
      <span class="ml-3" sidebar-toggle-item>Flight Pass</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ConnectButton",
  methods: {
    showModal() {
      this.$emit("show-modal");
    },
  },
};
</script>

<style></style>