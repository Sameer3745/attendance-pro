 import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://attendance-backend-54a9.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
