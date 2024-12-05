import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface TabBarIconProps {
  routeName: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({routeName}) => {
  let imageSource: any;

  switch (routeName) {
    case 'HomeTab':
      imageSource = require('../assets/img/wallet-icon.png');
      break;
    case 'Chart':
      imageSource = require('../assets/img/chart-icon.png');
      break;
    default:
      imageSource = require('../assets/img/pencil-icon.png');
  }

  return (
    <Image source={imageSource} style={[styles.icon]} />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default TabBarIcon;
