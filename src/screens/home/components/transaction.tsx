import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import useTransactions from '../hooks/useTransactions';
import { DataItem } from '../../../interfaces/transaction.interface';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const Transactions = () => {
  const { transactions, loading, error } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<DataItem[]>([]);

  const filterByDate = useCallback(() => {
    const today = new Date();
    const filtered = transactions.filter(item => {
      const createdAt = new Date(item.createdAt);
      return createdAt.toDateString() === today.toDateString();
    });
    setFilteredTransactions(filtered);
  }, [transactions]);

  useEffect(() => {
    if (transactions.length) {
      filterByDate();
    }
  }, [transactions, filterByDate]);

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.item}>
      <View style={styles.containerCard}>
        <Image source={{ uri: item.category.icon }} style={styles.icon} />
        <View style={styles.descriptionAndDate}>
          <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.textDate}>{item.description}</Text>
          <Text style={styles.textDate}>{item.date}</Text>
        </View>
        <View>
          <Text style={styles.textAmount}>${item.amount}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error || filteredTransactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error ? 'No transactions available.' : 'No transactions for today.'}
        </Text>
        <Image
          source={require('../../../assets/img/Saly-45.png')}
          style={styles.emptyImage}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.titleTransaction}>Transactions</Text>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(229, 155, 233, 0.1)',
  },
  containerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.07,
    padding: 10,
  },
  descriptionAndDate: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    width: width * 0.23,
  },
  textDate: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
  },
  textAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginTop: 8,
    marginHorizontal: -20,
  },
  loading: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: width * 0.8,
    height: height * 0.25,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
    fontWeight: 'bold',
  },
  titleTransaction: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
  },
});

export default Transactions;
