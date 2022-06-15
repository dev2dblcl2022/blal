import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AddCard,
  AddFamilyMember,
  AddInquiry,
  FindNearLabs,
  Home,
  MyAccount,
  MyCart,
  MyFamilyMembers,
  MyMembership,
  MyProfile,
  ReminderRecommendation,
  SearchLab,
  SelectCard,
  BookingDetails,
  OrderSummary,
  MapLocationView,
  CallUs,
  Blogs,
  FullBodyCheckup,
  MyReports,
  MapSetLocation,
  AddNewAddress,
  UploadPrescription,
  MyAddresses,
  AboutDrBlal,
  SampleReport,
  LinkUHID,
  Filter,
  MyBookings,
  ViewOffers,
  MyBookingDetail,
  NeedHelp,
  Notification,
  NewsEventDetail,
  SeeAllList,
  Rating,
  BlogDetailScreen,
  BlogSearchScreen,
  BlogFilterScreen,
  TrackProScreen,
  NearByLabFilter,
  ChangeLocation,
  EditAddress,
  CarouselPage,
  UploadedPrescriptions,
  BrowseLabTest,
  ConnectionHandle,
} from '../containers/screens/AppScreens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabBar from '../containers/components/TabBar/BottomTabBar';
import DrawerScreen from '../containers/components/Drawer/DrawerScreen';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AuthContext} from '../../context/context';
import {PrescriptionViewer} from '../containers/components';

function HomeTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="MyBookingDetail"
        component={MyBookingDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SeeAllList"
        component={SeeAllList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlogDetailScreen"
        component={BlogDetailScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NewsEventDetail"
        component={NewsEventDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="FullBodyCheckup"
        component={FullBodyCheckup}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Blogs"
        component={Blogs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyCart"
        component={MyCart}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="ConnectionHandle"
        component={ConnectionHandle}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReminderRecommendation"
        component={ReminderRecommendation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Rate"
        component={Rating}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="MyMembership"
        component={MyMembership}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="FindNearLabs"
        component={FindNearLabs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Filter"
        component={Filter}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlogFilterScreen"
        component={BlogFilterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TrackProScreen"
        component={TrackProScreen}
      />
      <Stack.Screen name="CarouselPage" component={CarouselPage} />
      <Stack.Screen name="BlogSearchScreen" component={BlogSearchScreen} />
      <Stack.Screen name="MyFamilyMembers" component={MyFamilyMembers} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="MapLocationView" component={MapLocationView} />
      <Stack.Screen name="MapSetLocation" component={MapSetLocation} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="UploadPrescription" component={UploadPrescription} />

      <Stack.Screen name="PrescriptionViewer" component={PrescriptionViewer} />

      <Stack.Screen name="SearchLab" component={SearchLab} />
      <Stack.Screen name="BrowseLabTest" component={BrowseLabTest} />
      <Stack.Screen name="MyReports" component={MyReports} />
      <Stack.Screen name="AddInquiry" component={AddInquiry} />
      <Stack.Screen name="AddFamilyMember" component={AddFamilyMember} />
      <Stack.Screen name="NearByLabFilter" component={NearByLabFilter} />
      <Stack.Screen name="MyBookingStack" component={MyBookingStack} />
      <Stack.Screen name="ViewOffers" component={ViewOffers} />
      <Stack.Screen name="MyBookings" component={MyBookings} />
      <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
    </Stack.Navigator>
  );
}

function EventTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SearchLab">
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchLab"
        component={SearchLab}
      />
      <Stack.Screen name="BrowseLabTest" component={BrowseLabTest} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="AddFamilyMember" component={AddFamilyMember} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen
        options={{headerShown: false}}
        name="FullBodyCheckup"
        component={FullBodyCheckup}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyCart"
        component={MyCart}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}
function NeedHelpTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NeedHelp">
      <Stack.Screen
        options={{headerShown: false}}
        name="NeedHelp"
        component={NeedHelp}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function ChatTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CallUs">
      <Stack.Screen
        options={{headerShown: false}}
        name="CallUs"
        component={CallUs}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function ProfileTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyAccountScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyAccountScreen"
        component={MyAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReminderRecommendation"
        component={ReminderRecommendation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddFamilyMember"
        component={AddFamilyMember}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddInquiry"
        component={AddInquiry}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyAddressesStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyAddresses">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyAddresses"
        component={MyAddresses}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MapSetLocation"
        component={MapSetLocation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditAddress"
        component={EditAddress}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChangeLocation"
        component={ChangeLocation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddNewAddress"
        component={AddNewAddress}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function BlogStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Blogs">
      <Stack.Screen
        options={{headerShown: false}}
        name="Blogs"
        component={Blogs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlogDetailScreen"
        component={BlogDetailScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlogSearchScreen"
        component={BlogSearchScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlogFilterScreen"
        component={BlogFilterScreen}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyMembershipStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyMembership">
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectCard"
        component={SelectCard}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddCard"
        component={AddCard}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyMembership"
        component={MyMembership}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function UploadedPrescriptionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="UploadedPrescriptions">
      <Stack.Screen
        options={{headerShown: false}}
        name="UploadedPrescriptions"
        component={UploadedPrescriptions}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TrackProScreen"
        component={TrackProScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PrescriptionViewer"
        component={PrescriptionViewer}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyAccount">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyAccount"
        component={MyAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReminderRecommendation"
        component={ReminderRecommendation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddInquiry"
        component={AddInquiry}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyBookingStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyBookings">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyBookings"
        component={MyBookings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyBookingDetail"
        component={MyBookingDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Rating"
        component={Rating}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TrackProScreen"
        component={TrackProScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="FullBodyCheckup"
        component={FullBodyCheckup}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyReportStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyReports">
      <Drawer.Screen
        options={{headerShown: false}}
        name="SampleReport"
        component={SampleReport}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="MyReports"
        component={MyReports}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="PrescriptionViewer"
        component={PrescriptionViewer}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function MyFamilyMembersStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MyFamilyMembers">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyFamilyMembers"
        component={MyFamilyMembers}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddFamilyMember"
        component={AddFamilyMember}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LinkUHID"
        component={LinkUHID}
      />
      <Stack.Screen name="ConnectionHandle" component={ConnectionHandle} />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{unmountOnBlur: true, headerShown: false}}
      backBehaviour="initialRoute"
      tabBarOptions={{
        tabStyle: {
          alignContent: 'flex-end',
        },
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
        })}
        name="Home"
        component={HomeTab}
      />
      {/* <Tab.Screen
        name="Search"
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
        })}
        component={EventTab}
      /> */}
      <Tab.Screen
        name="Need Help"
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
        })}
        component={NeedHelpTab}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
        })}
        name="Call Us"
        component={ChatTab}
      />
      <Tab.Screen
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          headerShown: false,
        })}
        name="My Account"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
}

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (
    routeName === 'MyCart' ||
    routeName === 'BookingDetails' ||
    routeName === 'ReminderRecommendation' ||
    routeName === 'MapLocationView' ||
    routeName === 'AddInquiry' ||
    routeName === 'MyProfile' ||
    routeName === 'FullBodyCheckup' ||
    routeName === 'FindNearLabs' ||
    routeName === 'Blogs' ||
    routeName === 'MyReports' ||
    routeName === 'MapSetLocation' ||
    routeName === 'OrderSummary' ||
    routeName === 'AddNewAddress' ||
    routeName === 'UploadPrescription' ||
    routeName === 'SearchLab' ||
    routeName === 'BrowseLabTest' ||
    routeName === 'MyReports' ||
    routeName === 'AddFamilyMember' ||
    routeName === 'Filter' ||
    routeName === 'ViewOffers' ||
    routeName === 'Notification' ||
    routeName === 'NewsEventDetail' ||
    routeName === 'SeeAllList' ||
    routeName === 'BlogDetailScreen' ||
    routeName === 'BlogSearchScreen' ||
    routeName === 'BlogFilterScreen' ||
    routeName === 'NearByLabFilter' ||
    routeName === 'ChangeLocation' ||
    routeName === 'MyBookingStack' ||
    routeName === 'MyBookings' ||
    routeName === 'MyBookingDetail' ||
    routeName === 'TrackProScreen' ||
    routeName === 'UploadedPrescriptions' ||
    routeName === 'ConnectionHandle' ||
    routeName === 'HomeScreen'
  ) {
    return false;
  }

  return true;
}

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      drawerContent={({navigation}) => {
        return <DrawerScreen navigation={navigation} />;
      }}
      initialRouteName={'BottomTabs'}>
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />

      <Drawer.Screen
        name="MyFamilyMembersStack"
        component={MyFamilyMembersStack}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="AddFamilyMember"
        component={AddFamilyMember}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="AddCard"
        component={AddCard}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="MyMembershipStack"
        component={MyMembershipStack}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="BlogStack"
        component={BlogStack}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="MyAddresses"
        component={MyAddressesStack}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="NeedHelp"
        component={NeedHelp}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="MyAccountStack"
        component={MyAccountStack}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="MyBookingStack"
        component={MyBookingStack}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="MyReports"
        component={MyReportStack}
      />

      <Drawer.Screen
        options={{headerShown: false}}
        name="AboutDrBlal"
        component={AboutDrBlal}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="SampleReport"
        component={SampleReport}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="UploadedPrescriptionsStack"
        component={UploadedPrescriptionsStack}
      />
    </Drawer.Navigator>
  );
}
