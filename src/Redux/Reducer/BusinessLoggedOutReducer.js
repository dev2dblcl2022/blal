import {IS_BUSINESS_USER_LOGGEDOUT} from '../ActionConstant/AuthConstant';

const initialState = {
  is_loggedout: false,
};

const BusinessLoggedOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_BUSINESS_USER_LOGGEDOUT:
      return {
        ...state,
        is_loggedout: action.payload,
      };
    default:
      return state;
  }
};

export default BusinessLoggedOutReducer;
