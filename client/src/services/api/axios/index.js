import axios from "axios";
import Cookies from "js-cookie";

const $api = axios.create({
  baseURL: "https://react-blog-api-azj3.onrender.com/"
});

$api.interceptors.request.use((config) => {
  const authToken = Cookies.get("auth-token");

  if (authToken) {
    config.headers.authorization = authToken;
  }

  return config;
});

export default $api;
