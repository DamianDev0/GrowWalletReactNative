import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/onboarding/onboardingScreen';
import SignUpScreen from '../screens/signUpScreen/signUpScreen';
import LoginScreen from '../screens/loginScreen/loginScreen';
import WalletScreen from '../screens/wallet/walletScreen';
import {useAuth} from '../context/useAuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MyTabs} from './TabsNavigation';
import BudgetAndTransactionScreen from '../screens/budgetAndTransaction/budgetAndTransactionScreen';
import Loader from '../components/loader.component';
import {NavigationParams} from '../types/navigation.types';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator<NavigationParams>();

const AppNavigation = () => {
  const {isAuthenticated} = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem('onboardingCompleted');
      setIsFirstLaunch(hasCompletedOnboarding === null);
      setLoading(false);
    };
    checkFirstLaunch();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={
          isAuthenticated ? 'Home' : isFirstLaunch ? 'Onboarding' : 'Login'
        }>
        {isFirstLaunch && !isAuthenticated && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
        )}

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
            <Stack.Screen
              name="BudgetAndTransactionScreen"
              component={BudgetAndTransactionScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
          </>
        ) : (
          <>
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
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
