import {PROFILE_SETUP_BUSINESS} from '../ActionConstant/AuthConstant';

const initialState = {
  business_profile_setup: false,
};

const ProfileBusinessReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_SETUP_BUSINESS:
      return {
        ...state,
        business_profile_setup: action.payload,
      };
    default:
      return state;
  }
};

export default ProfileBusinessReducer;
