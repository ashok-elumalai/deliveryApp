import axios from "axios";
import { useSelector } from "react-redux";

let baseURL = "http://127.0.0.1:5000"; // aka localhost or 0.0.0.0

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
