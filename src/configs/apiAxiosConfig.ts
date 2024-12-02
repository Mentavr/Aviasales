import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL;

export const clientAxios = axios.create({
  baseURL: url,
  timeout: 9000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
