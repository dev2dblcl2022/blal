import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {store} from '../Redux/Store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthAction, ProfileAction} from '../Redux/Action/AuthAction';
// import {PROFILE_SETUP, TOKEN} from '../Redux/ActionConstant/AuthConstant';

// URL config
// const DOMAIN = 'ht:tps://lims.blallab.com:443/LISWebAPI/';
const DOMAIN = 'https://silverapi.blallab.com';
// const DOMAIN = 'https://api.blallab.com';

export const API_BASE_URL = DOMAIN;

// services points config
export const blalServicesPoints = {
  blalUserServices: {
    packages: 'GetFilterTestPackage',
    investigation: 'GetInvestigations',
    GetBodyParts: 'GetBodyParts',
    GetTestCondition: 'GetTestCondition',
    findNearLabs: 'CentrebyGroupId',
    GetTestPackageDetails: 'GetTestPackageDetails',
    getMembershipCard: 'getMembershipCardList',
    getMembership: 'getMembershipCardDetailsByMobileNo',
    GettopTest: 'GettopTestPackage',
    CreateNewMembershipCard: 'CreateNewMembershipCard',
    reports: 'GetMyReports',
    getInvestigationsList: 'GetInvestigationsList',
  },
};
// Api call Methods
export const blalMethod = {
  put: 'put',
  post: 'post',
  get: 'get',
  delete: 'delete',
};

// axios config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const NetworkRequestBlal = async requestConfig => {
  try {
    // const token = await AsyncStorage.getItem('userToken');

    // apiClient.defaults.headers.common.Authorization = token;
    const resToken = await axios.post(
      `${API_BASE_URL}/api/login?UserName=1234&Password=abcd`,
    );

    if (resToken.status === 200) {
      const _data = resToken.data.Result.AccessToken;
      const response = await axios
        .create({
          baseURL: API_BASE_URL,
          headers: {
            'content-type': 'application/json',
            Authorization: _data,
          },
        })
        .request(requestConfig);

      if (response) {
        const {status} = response;
        if (status === 200) {
          const {data} = response;

          return data;
        }
      }
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default NetworkRequestBlal;
