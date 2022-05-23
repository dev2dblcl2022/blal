import AsyncStorage from '@react-native-async-storage/async-storage';
// import {ShowToast} from '../Container/Component/Common';
import instance from '../utils/axiosInterceptors';
import instanceImage from '../utils/imageAxiosInterceptor';
// import {showToaster} from '../helpers/toaster';

export function post(url, formData, data) {
  if (data === 1) {
    return instanceImage
      .post(url, formData)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        //showToaster(0,error.message);
        return error;
      });
  } else {
    return instance
      .post(url, formData)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        //showToaster(0,error.message);
        return error;
      });
  }
}

export const get = async (url, type = 0) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  let token = await AsyncStorage.getItem('userToken');
  if (token) {
    options.headers.authentication = `Bearer ${token}`;
  }
  options.headers.demo = `Bearer`;
  return instance
    .get(url, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // showToaster(0,error.message);
      // ShowToast(0, error.message);
      return error;
    });
};

export const Delete = async (url, type = 0) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  let token = await AsyncStorage.getItem('userToken');
  if (token) {
    options.headers.authentication = `Bearer ${token}`;
  }
  options.headers.demo = `Bearer`;
  return instance
    .delete(url, options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // showToaster(0,error.message);
      // ShowToast(0, error.message);
      return error;
    });
};
