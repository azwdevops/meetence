import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("session_cookie")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("session_cookie")
    )}`;
  }
  return req;
});

// user routes
export const signIn = (loginData) => API.post("/api/user/login/", loginData);
export const signUp = (newUser) => API.post("/api/user/signup/", newUser);
