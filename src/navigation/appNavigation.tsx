import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationParams} from '../types/navigation.types';
import HomeScreen from '../screens/home/homeScreen';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import SignUpScreen from '../screens/signUpScreen/signUpScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import WalletScreen from '../screens/wallet/walletScreen';
import {useAuth} from '../context/useAuthContext';

const Stack = createNativeStackNavigator<NavigationParams>();

const AppNavigation = () => {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Home' : 'Onboarding'}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
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
  );
};

export default AppNavigation;
