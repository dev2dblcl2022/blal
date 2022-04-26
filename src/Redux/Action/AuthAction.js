import axios from 'axios';

import {GET_ERRORS, SET_CURRENT_USER, GET_OTP} from './types';

// Login - Get User Token
export const sendOtp = postData => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/send_otp`, postData)
    .then(res => {
      dispatch({
        type: GET_OTP,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};
