import React, { useCallback, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TransactionsList from './components/transactionList';
import { useFocusEffect } from '@react-navigation/native';
import useTransactions from './hooks/useTransaction';

const TransactionScreen = () => {
  const { fetchTransactions, loading } = useTransactions();
  const [showLoading, setShowLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      setShowLoading(true);
      const timer = setTimeout(() => setShowLoading(false), 1000);
      return () => clearTimeout(timer);
    }, [fetchTransactions])
  );

  return (
    <LinearGradient
      colors={['#000000', '#6a1b9a', '#000000']}
      start={{ x: 2, y: 0 }}
      end={{ x: 0, y: 5 }}
      style={styles.container}
    >
      {showLoading || loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <TransactionsList />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionScreen;
