import axios from "axios";

const baseURL = "http://10.252.129.15:1993"; // Ganti dengan URL API yang sesuai

const api = axios.create({
  baseURL,
  // Konfigurasi lainnya seperti headers, timeout, dll bisa ditambahkan di sini
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
