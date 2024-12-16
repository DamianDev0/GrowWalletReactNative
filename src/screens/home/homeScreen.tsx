import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderHome from './components/headerHome';
import LinearGradient from 'react-native-linear-gradient';
import Categories from './components/categories';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useWalletBalance from './hooks/useHeader';
import {useNavigation} from '@react-navigation/native';
import CategoryUser from './components/userCategories';
import useCategoriesUser from './hooks/useCategoriesUser';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    wallet,
    loading: walletLoading,
    error: walletError,
    fetchWalletBalance,
    handleLogout,
  } = useWalletBalance();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategoriesUser();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      fetchWalletBalance();
      fetchCategories();
    });

    return () => {
      focusListener();
    };
  }, [navigation, fetchWalletBalance, fetchCategories]);

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
            loading={walletLoading}
            error={walletError}
            handleLogout={handleLogout}
          />
        </View>
        <Categories />
        <CategoryUser
          categories={categories}
          loading={categoriesLoading}
          error={categoriesError}
        />
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
