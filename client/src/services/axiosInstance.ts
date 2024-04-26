import axios from "axios";
import { LOCAL_STORAGE_TOKEN } from "../constants/common";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    config.headers["Access-Control-Allow-Credentials"] = "true";
    config.headers["accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 || error.response?.status === 403) {
//       localStorage.clear();
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
