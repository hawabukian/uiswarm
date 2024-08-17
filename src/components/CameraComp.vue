<template>
  <div>
    <button @click="startCamera">Aktifkan Kamera</button>
    <button @click="stopCamera">Matikan Kamera</button>
    <div v-if="stream">
      <video ref="videoElement" autoplay></video>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      stream: null,
      error: null,
    };
  },
  methods: {
    async startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.stream = mediaStream;
      } catch (err) {
        this.error = "Tidak dapat mengakses kamera: " + err.message;
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    },
  },
  mounted() {
    if (this.stream && this.$refs.videoElement) {
      this.$refs.videoElement.srcObject = this.stream;
    }
  },
};
</script>
  