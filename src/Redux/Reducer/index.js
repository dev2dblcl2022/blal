import {combineReducers} from 'redux';

// reducers
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ProfileBusinessReducer from './ProfileBusinessReducer';
import BusinessUserReducer from './BusinessUserReducer';
import BusinessLoggedOutReducer from './BusinessLoggedOutReducer';
import configureNotificationReducer from './configureNotificationReducer';

const rootReducer = combineReducers({
  AuthReducer,
  ProfileReducer,
  ProfileBusinessReducer,
  BusinessUserReducer,
  BusinessLoggedOutReducer,
  configureNotification: configureNotificationReducer,
});

export default rootReducer;
