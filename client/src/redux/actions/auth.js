// axios items
import * as api from "../../api/index";

// redux API items

import {
  AUTH_SUCCESS,
  CLOSE_LOGIN,
  CLOSE_SIGNUP,
  LOGOUT,
  STOP_LOADING,
} from "../actions/types";
import { setAlert } from "./shared";

// shared items
import globals from "../../shared/globals";

const { error, success } = globals;

// sign up user
export const signup = (newUser, resetSignup) => async (dispatch) => {
  await api
    .signUp(newUser)
    .then((res) => {
      dispatch(setAlert(success, res.data.msg));
      resetSignup(); // clear form values
    })
    .catch((err) => {
      // if bad client request
      if (err.response.status === 400) {
        dispatch(setAlert(error, err.response.data.msg));
      } else {
        console.log(err);
      }
    })
    .finally(() => {
      dispatch({ type: STOP_LOADING });
    });
};

// activate user account
export const activateAccount = (body) => async (dispatch) => {
  const { token, history } = body;
  try {
    // destructure the payload got from the request
    const { data } = await api.activateUser(token);
    if (data.msg === "account activated") {
      alert(data.msg);
    } else {
      alert(data.msg);
    }
  } catch (err) {
    if (err.response.status === 400) {
      alert(err.response.data.msg);
    } else {
      alert("An error occurred");
    }
  } finally {
    history.replace("/");
  }
};

// login user
export const login = (loginData) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signIn(loginData);
    localStorage.setItem("session_cookie", data?.token);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
    dispatch({ type: CLOSE_LOGIN });
  } catch (err) {
    if (err.response.status === 400) {
      dispatch(setAlert(error, err.response.data.msg));
    } else {
      console.log(err);
    }
  }
};

// get user data
export const getuser = () => async (dispatch) => {
  await api
    .getUser()
    .then((res) => {
      dispatch({ type: AUTH_SUCCESS, payload: res.data?.user });
    })
    .catch((err) => {
      dispatch({ type: LOGOUT });
      localStorage.clear();
      console.log(error);
    });
};

// logout user
export const logout = (history) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  history.replace("/");
};
