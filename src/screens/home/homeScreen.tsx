import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderHome from './components/headerHome';
import LinearGradient from 'react-native-linear-gradient';
import Categories from './components/categories';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useWalletBalance from './hooks/useHeader';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {wallet, loading, error, fetchWalletBalance, handleLogout} =
    useWalletBalance();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      fetchWalletBalance();
    });

    return () => {
      focusListener();
    };
  }, [navigation, fetchWalletBalance]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient
        colors={['#000000', '#6a1b9a', '#000000']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 5}}
        style={styles.container}>
        <View>
          <HeaderHome
            wallet={wallet}
            loading={loading}
            error={error}
            handleLogout={handleLogout}
          />
        </View>
        <Categories />
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
