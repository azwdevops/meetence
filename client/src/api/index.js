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

// user routes
export const signUp = (newUser) => API.post("/api/user/signup/", newUser);
export const activateUser = (token) =>
  API.post("/api/user/activate/", { token });
export const signIn = (loginData) => API.post("/api/user/login/", loginData);
export const getUser = () => API.get("/api/user/get-user-data/");
