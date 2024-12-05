import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParams} from '../types/navigation.types';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import SignUpScreen from '../screens/signUpScreen/signUpScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import WalletScreen from '../screens/wallet/walletScreen';
import {useAuth} from '../context/useAuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { MyTabs } from './TabsNavigation';

const Stack = createNativeStackNavigator<NavigationParams>();

const AppNavigation = () => {
  const {isAuthenticated} = useAuth();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Home' : 'Onboarding'}>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Wallet"
                component={WalletScreen}
                options={{headerShown: false, animation: 'slide_from_right'}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false, animation: 'slide_from_right'}}
              />
              <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{headerShown: false, animation: 'slide_from_right'}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
