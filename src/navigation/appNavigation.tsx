import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParams} from '../types/navigation.types';
import HomeScreen from '../screens/home/homeScreen';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import SignUpScreen from '../screens/signUpScreen/signUpScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';

const Stack = createNativeStackNavigator<NavigationParams>();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Signup'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
