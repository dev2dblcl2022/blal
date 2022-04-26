import {configureNotificationActionTypes} from '../ActionConstant';

export const configureNotificationAction = payload => ({
  type: configureNotificationActionTypes.IS_NOTIFICATION_CONFIGURED,
  payload,
});
