import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://testusdtbackend-production.up.railway.app",
  withCredentials: true,
});

export default axiosInstance;
