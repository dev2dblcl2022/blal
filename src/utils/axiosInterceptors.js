// import axios from "axios";
// import { SiteUrl } from '../config/Setting';

// var instance = axios.create({
//     baseURL: 'http://192.168.1.90:3000/api/v1/user-service/users/',
//     timeout: 60000,
//     headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': '*',
//     },
// });

// instance.interceptors.request.use(function (config) {
//     console.log('config is ',config)
//     return config;
// }, function (error) {
//     return error;
// });

// instance.interceptors.response.use(function (response) {
//     // console.log('response of axios',response)
//     return response;
// }, function (error) {
//     console.log('error of axios',error)
//     return error;
// })

// export default instance;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SiteUrl} from '../config/Setting';

function parseError(messages) {
  // error
  // console.log('message',messages)
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({messages: messages});
    } else {
      return Promise.reject({messages: [messages]});
    }
  } else {
    return Promise.reject({messages: ['エラーが発生しました']});
  }
}

/**
 * parse response
 */
function parseBody(response) {
  //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code
  // if (response.status === 200) {
  return response;
  // return response.data.result
  // } else {
  //   console.log('message',response)
  //   return this.parseError(response.data)
  // }
}

/**
 * axios instance
 */

let instance = axios.create({
  baseURL: 'http://14.98.110.243:3000/api/v1/user-service/users/',
  paramsSerializer: function (params) {
    return qs.stringify(params, {indices: false});
  },
});

// request header
instance.interceptors.request.use(
  async config => {
    // console.log('config is = ', config);
    // Do something before request is sent

    let apiToken = '';
    apiToken = await AsyncStorage.getItem('apiToken');
    // console.log('apiToken',apiToken)
    config.headers = {
      Authorization: `Bearer ${JSON.parse(apiToken)}`,
      'Content-Type': 'application/json',
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response parse
instance.interceptors.response.use(
  response => {
    return parseBody(response);
  },
  error => {
    // console.warn('Error status', error.response.status)
    // return Promise.reject(error)
    if (error.response) {
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
