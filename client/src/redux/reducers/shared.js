import * as actionTypes from "../actions/types";

export const sharedInitialState = {
  alert: {
    status: false,
    alertType: "", // either success or error
    msg: "",
  },
  loading: false,
};

const sharedReducer = (state = sharedInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default sharedReducer;
