import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

export const sharedInitialState = {
  alert: {
    status: false,
    alertType: "", // either success or error
    msg: "",
  },
};

const sharedReducer = (state = sharedInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: payload,
      };
    default:
      return state;
  }
};

export default sharedReducer;
