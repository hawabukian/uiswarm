<template>
  <AuthenticatedLayout>
    <div class="dashboard-container">
      <div class="header">
        <div class="title">Dashboard</div>
        <!-- Tambahkan elemen lain sesuai kebutuhan, misalnya navigasi atau informasi pengguna -->
      </div>
      <div class="main-content">
        <PhotoSlideshow />
      </div>
      <div class="footer">
        <!-- Tambahkan footer jika diperlukan -->
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import PhotoSlideshow from "@/components/PhotoSlideshow.vue";

export default {
  name: "DashboardView",
  components: {
    AuthenticatedLayout,
    PhotoSlideshow
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #2c3e50; /* Sesuaikan dengan warna latar belakang di video */
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #34495e; /* Sesuaikan dengan warna header di video */
}

.title {
  font-size: 28px;
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ecf0f1; /* Sesuaikan dengan warna konten utama di video */
  color: rgb(255, 252, 252);
  overflow-y: auto;
}

.footer {
  padding: 10px;
  background-color: #34495e; /* Sesuaikan dengan warna footer di video */
  text-align: center;
}
</style>
