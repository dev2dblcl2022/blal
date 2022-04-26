import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  IntroOne,
  IntroThree,
  IntroTwo,
} from '../containers/screens/AppIntroScreens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function AppIntroStack() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="IntroOne">
      <Stack.Screen name="IntroOne" component={IntroOne} />

      <Stack.Screen name="IntroTwo" component={IntroTwo} />
      <Stack.Screen name="IntroThree" component={IntroThree} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
