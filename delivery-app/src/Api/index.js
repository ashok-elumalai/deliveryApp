import axios from "axios";
import { useSelector } from "react-redux";

let baseURL = "http://localhost:3000";

export const API = axios.create({
  baseURL,
});

const token = localStorage.getItem("token");

API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
