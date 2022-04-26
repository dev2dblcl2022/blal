import {configureNotificationActionTypes} from '../ActionConstant';

const initialState = {
  isNotificationConfigured: false,
};

const configureNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case configureNotificationActionTypes.IS_NOTIFICATION_CONFIGURED:
      return action.payload;
    default:
      return state;
  }
};

export default configureNotificationReducer;
