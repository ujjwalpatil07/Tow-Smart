import axios from "axios";

const api = axios.create({
  baseURL: "https://tow-smart.onrender.com",
});

export default api;
