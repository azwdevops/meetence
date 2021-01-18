import { AUTH_SUCCESS } from "../actions/types";

import * as api from "../../api/index";

// sign up user
export const signup = (newUser) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signUp(newUser);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// login user
export const login = (loginData) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signIn(loginData);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
  }
};
