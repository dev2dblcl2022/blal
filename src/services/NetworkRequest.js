import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {Api_Live_Url, Api_Local_Url} from '../config/Setting';

// URL config
const DOMAIN = Api_Live_Url;

export const API_BASE_URL = DOMAIN;

// services points config
export const servicesPoints = {
  userServices: {
    sendOtp: 'users/api/send_otp',
    verifyOtp: 'users/api/verify_otp',
    registration: 'users/api/registration',
    my_family_mambers: 'users/api/my_family_mambers',
    add_family_mamber: 'users/api/add_family_mamber',
    post_enquiry: 'users/api/post_enquiry',
    home_banners: 'users/api/home_banners',
    blogs_Data: 'users/api/get_blogs_data',
    add_address: 'users/api/add_address',
    update_profile: 'users/api/update_profile',
    my_profile: 'users/api/my_profile',
    get_User_Address: 'users/api/get_address',
    upload_prescription: 'users/api/upload_prescription',
    add_uhid_primary: 'users/api/add_uhid_primary',
    add_uhid_members: 'users/api/add_uhid_members',
    remove_uhid_members: 'users/api/remove_uhid_members',
    checkPinCode: 'users/api/check_pincode',
    set_primary_address: 'users/api/set_primary_address',
    read_notification: 'users/api/read_notification',
    notification_count: 'users/api/notification_count',
    deactive_patient: 'users/api/deactive_patient',
    clearAllNotification: 'users/api/clear_notifications',
    recommendation: 'users/api/recommendation',
    deleteAddress: 'users/api/delete_address',
    editAddress: 'users/api/update_address',
    my_prescriptions: 'users/api/my_prescriptions',
  },
  bookingServices: {
    add: 'bookings/api/add',
    myCart: 'bookings/api/my_cart',
    remove_member_item_from_cart: 'bookings/api/remove_member_item_from_cart',
    create_booking: 'bookings/api/create_booking',
    mybookings: 'bookings/api/mybookings',
    booking_details: 'bookings/api/booking_details',
    cartCount: 'bookings/api/my_cart_count',
    myreports: 'bookings/api/myreports',
    cancelBooking: 'bookings/api/cancelled_booking',
    booking_time_slots: 'bookings/api/booking_time_slots',

    myNotifications: 'bookings/api/my_notifications',
    tests_by_member: 'bookings/api/tests_by_member',
    my_smart_reports: 'bookings/api/my_smart_reports',
    check_time_slot_availability: 'bookings/api/check_time_slot_availability',
    check_top_test_in_cart: 'bookings/api/check_top_test_in_cart',
    clear_my_cart: 'bookings/api/clear_my_cart',
    create_pending_booking: 'bookings/api/create_pending_booking',
    live_track: 'bookings/api/home_tracking_bookings',
    check_cart_for_lab: 'bookings/api/check_cart_for_lab',
  },
  couponServices: {
    couponApiOffers: 'coupons/api/offers',
  },
  paymentServices: {
    initiate_transaction: 'payment/api/initiate_transaction',
    transaction_callback: 'payment/api/transaction_callback',
  },
  commonServices: {
    why_choose_blal_lab: 'common/api/why_choose_blal_lab',
    news_events_list: 'common/api/news_events_list',
    top_tests_packages: 'common/api/top_tests_packages',
  },
  rating: {
    get_rating_data: 'ratings/api/details',
    give_rating: 'ratings/api/user_post_rating',
  },
  blogs: {
    home_blogs: 'blogs/api/home_blogs',
    bloglistbycategory: 'blogs/api/bloglistbycategory',
    blogdetails: 'blogs/api/blogdetails',
    commentblog: 'blogs/api/commentblog',
    likeblog: 'blogs/api/likeblog',
    blog_sub_categories: 'blog/categories/api/sub_categories',
  },
};
// Api call Methods
export const method = {
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

async function NetworkRequest(requestConfig) {
  try {
    const token = await AsyncStorage.getItem('userToken');
    apiClient.defaults.headers.common.Authorization = token;
    const response = await apiClient.request(requestConfig);

    if (response) {
      const {status} = response;

      if (status === 200) {
        const {data} = response;
        // let apiData = data;

        // if (JSON.parse(apiData.status) === 401) {
        //   LogoutFun();
        // }
        return data;
      }
    }
    return null;
  } catch (error) {
    return error.message;
  }
}

export default NetworkRequest;
