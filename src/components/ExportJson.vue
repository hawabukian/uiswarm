<template>
  <div>
    <button @click="exportData">Export Data</button>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  methods: {
    async exportData() {
      try {
        // Mengambil data dari API menggunakan Axios
        const response = await axios.get("URL_API_ANDA");
        const data = response.data;

        // Mengonversi data menjadi string JSON
        const jsonData = JSON.stringify(data, null, 2);

        // Membuat objek Blob untuk menyimpan data JSON
        const blob = new Blob([jsonData], { type: "application/json" });

        // Membuat URL untuk blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Membuat elemen <a> untuk mendownload file JSON
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "data.json";
        a.style.display = "none";

        // Menambahkan elemen <a> ke dokumen
        document.body.appendChild(a);

        // Mengklik elemen <a> untuk memulai pengunduhan
        a.click();

        // Menghapus elemen <a> setelah pengunduhan selesai
        document.body.removeChild(a);

        // Merevok URL blob
        window.URL.revokeObjectURL(blobUrl);

        console.log("Data berhasil diekspor ke data.json");
      } catch (error) {
        console.error("Gagal mengambil data atau menyimpan file JSON:", error);
      }
    },
  },
};
</script>
  