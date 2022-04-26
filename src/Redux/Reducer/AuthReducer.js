import { GET_OTP, AUTH_LOADING } from "../Action/types";

const initialState = {
  otp: null,
  auth_loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        auth_loading: true,
      };
    case GET_OTP:
      return {
        ...state,
        otp: action.payload,
        auth_loading: false,
      };
    default:
      return state;
  }
}
