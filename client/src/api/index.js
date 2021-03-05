import API from "../shared/axios";

// user routes
export const signUp = (newUser) => API.post("/api/user/signup/", newUser);
export const activateUser = (token) =>
  API.post("/api/user/activate/", { token });
export const signIn = (loginData) => API.post("/api/user/login/", loginData);
export const getUser = () => API.get("/api/user/get-user-data/");
