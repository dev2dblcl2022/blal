import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './style';

import {BoldText, RegularText} from '../../../components/Common';

import {
  HomeHorizontalList,
  LatestBlogsCard,
  Loader,
  MainContainer,
  SearchHeader,
  SearchLabCard,
  SelectPatientPopup,
  SelectPrimaryCard,
  TestByBodyPartsCard,
  Toast,
} from '../../../components';
import imagesConstants from '../../../../constants/imagesConstants';

import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import colors from '../../../../constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Blal_Panel_Id, Blal_City_Id} from '../../../../config/Setting';
// import _debounce from 'lodash/debounce';

import _ from 'lodash';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
const index = ({navigation, route}) => {
  let blogType = route.params?.blogType;
  let category_id = route.params?.data?.id;
  const [visible, setVisible] = useState(false);
  const [packageData, setPackageData] = useState({});
  const {signOut} = React.useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [categoryId, setCategoryId] = useState(false);
  const [subCategoryBlog, setSubCategoryBlog] = useState([]);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  const [loader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFilterData();
      getBlogs();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (category_id) {
      getSubCategory();
    }
  }, [categoryId]);

  const getSubCategory = async () => {
    let data = {
      category_id: category_id,
    };

    let requestConfig = {
      method: method.get,
      url: `${servicesPoints.blogs.blog_sub_categories}?category_id=${data.category_id}`,
    };
    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        setSubCategoryBlog(response.data);
      } else {
        Toast(response.message, 0);
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        } else if (response.status === 401) {
          signOut();
        } else {
          null;
        }
        setLoader(false);
      }
    }
  };

  const getFilterData = async () => {
    let startDate = await AsyncStorage.getItem('startDate');
    let endDate = await AsyncStorage.getItem('endDate');
    setStartDate(startDate ? startDate : '');
    setEndDate(endDate ? endDate : '');
  };

  const getBlogs = async val => {
    try {
      let data = {
        category_id: category_id === undefined ? null : category_id,
        sub_category_id: null,
        search_keyword: val,
        page: page,
        blog_type: blogType,
        startDate: await AsyncStorage.getItem('startDate'),
        endDate: await AsyncStorage.getItem('endDate'),
      };

      let url = `${servicesPoints.blogs.bloglistbycategory}`;

      url = `${url}?page=${data.page}`;
      if (data.category_id) {
        url = `${url}&category_id=${data.category_id}`;
      }

      if (data.sub_category_id) {
        url = `${url}&sub_category_id=${
          data.sub_category_id ? data.sub_category_id : null
        }`;
      }

      if (data.category_id) {
        url = `${url}&blog_type=${'Category'}`;
      }

      if (data.search_keyword) {
        url = `${url}&search_keyword=${data.search_keyword}`;
      }

      if (data.blog_type) {
        url = `${url}&blog_type=${data.blog_type ? data.blog_type : null}`;
      }
      if (data.startDate) {
        url = `${url}&start_date=${data.startDate ? data.startDate : null}`;
      }
      if (data.endDate) {
        url = `${url}&end_date=${data.endDate ? data.endDate : null}`;
      }

      let requestConfig = {
        method: method.get,
        url: url,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setBlogs(response.data.docs);
          setLoader(false);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
      if (category_id) {
        setCategoryId(category_id);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const setSearchValue = async val => {
    await setSearchText(val);

    getBlogs(val);
  };

  const renderBlogCard = item => {
    return (
      <LatestBlogsCard
        onPress={() =>
          navigation.navigate('BlogDetailScreen', {
            data: item,
          })
        }
        data={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchHeader
        onChangeText={val => setSearchValue(val)}
        // onPressFilter={onFilter}
        onClearText={() => setSearchValue('')}
        onBack={() => navigation.goBack()}
        placeholderText={'Enter Blogs Name'}
        cartVisible={false}
        cartCount={cartCount}
        onPressCart={() => navigation.navigate('MyCart')}
        value={searchText}
        onPressFilter={() => navigation.navigate('BlogFilterScreen')}
        // filterVisible={searchText ? true : false}
        filterVisible={true}
        title={'Search Blogs'}
      />
      <MainContainer>
        <View style={styles.mainContainerSearched}>
          {searchText ? (
            <View style={styles.headingSection}>
              <BoldText
                style={styles.headingMain}
                title={`Showing results for ${searchText}`}
              />
            </View>
          ) : null}

          {category_id && subCategoryBlog.length > 0 ? (
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={subCategoryBlog}
                horizontal={true}
                // onPressSeeAll={({item}) =>
                //   navigation.navigate('SearchLab', {

                //     testIdBodyParts: Number(item.Id),
                //   })
                // }
                seeAll={false}
                listTitle={'Sub Category'}
                extraData={subCategoryBlog}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        backgroundColor: colors.app_theme_light_green,
                        marginHorizontal: hp('0.5%'),
                        borderRadius: 5,
                        padding: hp('1.5%'),
                      }}>
                      <View style={styles.titleSection}>
                        <RegularText
                          style={{color: 'white'}}
                          title={item.name}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          ) : null}

          <View style={styles.dataSection}>
            <View style={styles.searchingListSection}>
              <FlatList
                data={blogs}
                showsVerticalScrollIndicator={false}
                extraData={blogs}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        paddingTop: hp('20%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RegularText
                        style={{
                          color: colors.app_theme_dark_green,
                          fontSize: hp('2.5%'),
                        }}
                        title={`No Blogs found`}
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => renderBlogCard(item)}
              />
            </View>
          </View>
        </View>
      </MainContainer>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
