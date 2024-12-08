import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderHome from './components/headerHome';
import LinearGradient from 'react-native-linear-gradient';
import Categories from './components/categories';
import Transactions from './components/transaction';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient
        colors={['#000000', '#6a1b9a', '#000000']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 5}}
        style={styles.container}>
        <View>
          <HeaderHome />
        </View>
        <Categories />
        <Transactions />
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
