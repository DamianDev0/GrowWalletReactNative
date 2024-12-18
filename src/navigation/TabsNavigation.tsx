import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/homeScreen';
import TabBarIcon from './TabBarIcon';
import {NavigationTab} from '../types/navigation.types';
import TransactionScreen from '../screens/transactionScreen/transactionScreen';
import {StyleSheet, Dimensions, View} from 'react-native';

const Tab = createBottomTabNavigator<NavigationTab>();
const {width} = Dimensions.get('window');

export const MyTabs = () => (
  <View style={{flex: 1}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => <TabBarIcon routeName={route.name} />,
        tabBarActiveTintColor: '#e8daef',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
        tabBarStyle: [styles.tabBarStyle, styles.staticTabBar],
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{tabBarLabel: 'Wallet'}}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{tabBarLabel: 'Transactions'}}
      />
    </Tab.Navigator>
  </View>
);

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBarStyle: {
    position: 'absolute',
    width: width * 0.6,
    height: 60,
    alignSelf: 'center',
    bottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2,
    marginLeft: width * 0.2,
    overflow: 'hidden',
  },
  staticTabBar: {
    left: width * 0.2,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: width * 0.7,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabBarItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default MyTabs;
