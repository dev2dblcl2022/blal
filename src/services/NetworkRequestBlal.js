import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {store} from '../Redux/Store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthAction, ProfileAction} from '../Redux/Action/AuthAction';
// import {PROFILE_SETUP, TOKEN} from '../Redux/ActionConstant/AuthConstant';

// URL config
// const DOMAIN = 'ht:tps://lims.blallab.com:443/LISWebAPI/';
const DOMAIN = 'https://silverapi.blallab.com';

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

    const response = await apiClient.request(requestConfig);

    if (response) {
      const {status, message} = response;

      if (status === 200) {
        const {data} = response;

        return data;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

export default NetworkRequestBlal;
