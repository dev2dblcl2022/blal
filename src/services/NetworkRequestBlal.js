import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {getRelease} from '../env';

const releaseEnvironment = getRelease();
export const API_BASE_URL = releaseEnvironment.DOMAIN;

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
    getState: 'GetState',
    CentrebyGroupId: 'CentrebyGroupId',
    getCity: 'api/City',
    getFacility: 'GetFacility',
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
