import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

Axios.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Axios;
