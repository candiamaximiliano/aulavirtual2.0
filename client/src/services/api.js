import axios from "axios";

const instance = axios.create({
  baseURL: "https://profesoradocaribeño.com.ar/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
