import axios from "axios";
import { useSelector } from "react-redux";

let baseURL = "http://127.0.0.1:5000"; // aka localhost or 0.0.0.0
// let baseURL = "http://192.168.1.130:5000"; // local network api server url

export const API = axios.create({
  baseURL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
