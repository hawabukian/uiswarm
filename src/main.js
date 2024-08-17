import { createApp } from "vue";
import "./main.css";
import router from "./router";
import axios from "axios";
import { L } from "leaflet";
import "leaflet/dist/leaflet.css";
import App from "./App.vue";

// Konfigurasi Axios
axios.defaults.baseURL = "http://localhost:1993/api";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("x-access-token");

// Membuat instance aplikasi
const app = createApp(App);

// Menambahkan properti global untuk Leaflet
app.config.globalProperties.$L = L;

// Menggunakan router
app.use(router);

// Menyematkan aplikasi ke elemen dengan id 'app'
app.mount("#app");
