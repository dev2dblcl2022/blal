import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

// root reducer
import rootReducer from '../Redux/Reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'AuthReducer',
    'ProfileReducer',
    'configureNotification',
    'BusinessUserReducer',
    'ProfileBusinessReducer',
    'BusinessLoggedOutReducer',
  ],
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(persistedReducer, {}, enhancer);
const persistor = persistStore(store);

export {store, persistor};
