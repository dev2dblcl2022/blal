import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {
  BlogsVideoGalleryCard,
  DefaultHeader,
  HomeHorizontalList,
  LatestBlogsCard,
  Loader,
  TestByBodyPartsCard,
  Toast,
} from '../../../components';
import styles from './style';
import {DEV_HEIGHT, DEV_WIDTH} from '../../../components/Device/DeviceDetails';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';

import imagesConstants from '../../../../constants/imagesConstants';
import {BoldText} from '../../../components/Common';
import {AuthContext} from '../../../../../context/context';
const condition = DEV_HEIGHT >= 926;

const index = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const carouselRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [blogsCategory, setBlogsCategory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogsSliderImages, setBlogsSliderIMages] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBlogsData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (latestBlogs) {
      getSliderImages();
    }
  }, [latestBlogs]);

  const getSliderImages = () => {
    let arr = [];
    arr = latestBlogs.map(item => {
      return {image: item.image};
    });
    setBlogsSliderIMages(arr);
  };

  const getBlogsData = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.blogs_Data,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setBlogsCategory(response.data.blogs_category);
          setPopularBlogs(response.data.popular_blogs);
          setLatestBlogs(response.data.latest_blogs);
          setLoader(false);
        } else {
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
    } catch (error) {
      console.log(error);
    }
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={blogsSliderImages.length}
        activeDotIndex={activeIndex}
        containerStyle={{paddingVertical: 1}}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
      />
    );
  };

  const _renderItem = (item, parallaxProps) => {
    return (
      <View style={styles.item}>
        <View style={{height: '100%', width: '100%'}}>
          <Image style={styles.image} source={{uri: item.image}} />
        </View>
      </View>
      // <View style={styles.item}>
      //   <ParallaxImage
      //     source={imagesConstants.newsImage}
      //     containerStyle={styles.imageContainer}
      //     style={styles.image}
      //     // parallaxFactor={0.4}
      //     {...parallaxProps}
      //   />
      // </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader title={'Blogs'} onBack={() => navigation.goBack()} />
      {/* <MainContainer> */}
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Carousel
            layout="default"
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            autoplayDelay={3000}
            ref={carouselRef}
            sliderWidth={DEV_WIDTH}
            sliderHeight={200}
            itemWidth={DEV_WIDTH}
            data={blogsSliderImages}
            renderItem={({item}) => _renderItem(item)}
            hasParallaxImages={true}
            onSnapToItem={index => setActiveIndex(index)}
          />
          <View style={styles.paginationSection}>{pagination()}</View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BlogSearchScreen')}
            style={styles.inputSection}>
            <View style={styles.textInputView}>
              <TextInput
                placeholderTextColor={styles.placeholderColor}
                style={styles.textInput}
                editable={false}
                onChangeText={text => setSearchText(text)}
                placeholder={'Search Keyword'}
              />
              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={imagesConstants.search} />
              </View>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
            onPress={() => alert('Under Development')}
            style={[styles.filterBtnSection]}>
            <Image style={styles.filterImg} source={imagesConstants.filter} />
            <BoldText style={styles.filterText} title={'Filter'} />
          </TouchableOpacity> */}
        </View>

        <View style={styles.fullContainer}>
          {/* Test by Body Parts Section */}
          <View style={styles.testByCondition}>
            <HomeHorizontalList
              data={blogsCategory}
              horizontal={true}
              labelBold={true}
              listTitle={'Categories'}
              extraData={blogsCategory}
              renderItem={({item}) => {
                return (
                  <TestByBodyPartsCard
                    onPress={() =>
                      navigation.navigate('BlogSearchScreen', {data: item})
                    }
                    blogs={true}
                    data={item}
                  />
                );
              }}
            />
          </View>
          {/* Test by Body Parts Section */}

          {/* Blogs Section */}
          <View style={styles.testByCondition}>
            <HomeHorizontalList
              data={popularBlogs}
              labelBold={true}
              horizontal={true}
              ItemSeparatorComponent={() => {
                return <View style={styles.listSepVertical} />;
              }}
              onPressSeeAll={({item}) =>
                navigation.navigate('BlogSearchScreen', {blogType: 'Popular'})
              }
              seeAll={true}
              listTitle={`Popular Blog's`}
              extraData={popularBlogs}
              renderItem={({item}) => {
                return (
                  <BlogsVideoGalleryCard
                    onPress={() =>
                      navigation.navigate('BlogDetailScreen', {data: item})
                    }
                    data={item}
                  />
                );
              }}
            />
          </View>
          {/* Blogs Section */}

          {/* News Section */}
          <View style={[styles.testByCondition]}>
            <HomeHorizontalList
              data={latestBlogs}
              ItemSeparatorComponent={() => {
                return <View style={styles.listSepVertical} />;
              }}
              listTitle={'Latest Blogs'}
              labelBold={true}
              extraData={latestBlogs}
              seeAll={true}
              onPressSeeAll={({item}) =>
                navigation.navigate('BlogSearchScreen', {blogType: 'Latest'})
              }
              renderItem={({item}) => {
                return (
                  <LatestBlogsCard
                    onPress={() =>
                      navigation.navigate('BlogDetailScreen', {data: item})
                    }
                    data={item}
                  />
                );
              }}
            />
          </View>
          {/* News Section */}
        </View>
      </ScrollView>
      <Loader display={loader} />
      {/* </MainContainer> */}
    </SafeAreaView>
  );
};

export default index;
