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
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      console.log(action?.payload);
      return state;
    default:
      return state;
  }
};

export default userReducer;
