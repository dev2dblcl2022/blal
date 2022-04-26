import {BUSINESS_USER} from '../ActionConstant/AuthConstant';

const initialState = {
  business_user: false,
};

const BusinessUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS_USER:
      return {
        ...state,
        business_user: action.payload,
      };
    default:
      return state;
  }
};

export default BusinessUserReducer;
