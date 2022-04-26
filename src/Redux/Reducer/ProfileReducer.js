import {PROFILE_SETUP} from '../ActionConstant/AuthConstant';

const initialState = {
  profile_setup: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_SETUP:
      return {
        ...state,
        profile_setup: action.payload,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
