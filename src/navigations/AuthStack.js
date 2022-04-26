import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  Login,
  SignUp,
  ResetPassword,
  Otp,
} from '../containers/screens/AuthScreens';
import {
  AddCard,
  LinkUHID,
  MyFamilyMembers,
  MyMembership,
  PrivacyPolicy,
  ReminderRecommendation,
  SelectCard,
  TermsCondition,
} from '../containers/screens/AppScreens';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="MyMembership" component={MyMembership} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default AuthStack;
