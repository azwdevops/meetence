// types import
import {
  CLOSE_SIGNUP,
  OPEN_LOGIN,
  OPEN_SIGNUP,
  CLOSE_LOGIN,
  AUTH_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  signupForm: false,
  loginForm: false,
  user: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  },
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIGNUP:
      return {
        ...state,
        signupForm: true,
      };
    case CLOSE_SIGNUP:
      return {
        ...state,
        signupForm: false,
      };
    case OPEN_LOGIN:
      return {
        ...state,
        loginForm: true,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        loginForm: false,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("session_cookie", payload?.token);
      return { ...state, user: payload?.user };
    case LOGOUT:
      localStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
