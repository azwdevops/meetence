import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("session_cookie")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "session_cookie"
    )}`;
  }
  return req;
});

export default API;
