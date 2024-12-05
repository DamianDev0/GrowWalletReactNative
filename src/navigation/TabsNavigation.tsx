import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/homeScreen';
import ChartScreen from '../screens/chartScreen/chartScreen';
import TabBarIcon from './TabBarIcon';

const Tab = createBottomTabNavigator();

export const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: () => <TabBarIcon routeName={route.name} />,
      tabBarActiveTintColor: '#5d6d7e',
      tabBarInactiveTintColor: '#000',
      tabBarStyle: {
        backgroundColor: '#452150',
        height: 55,
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {fontSize: 9, color: '#FFF'},
      headerShown: false,
    })}>
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{tabBarLabel: 'Wallet'}}
    />
    <Tab.Screen
      name="Chart"
      component={ChartScreen}
      options={{tabBarLabel: 'Charts'}}
    />
  </Tab.Navigator>
);
