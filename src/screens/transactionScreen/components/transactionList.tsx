import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import useTransactions from '../hooks/useTransaction';
import { DataItem } from '../../../interfaces/transaction.interface';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const TransactionsList = () => {
  const { transactions, loading, error } = useTransactions();

  const renderItem = ({ item }: { item: DataItem }) => (
    <View style={styles.item}>
      <View style={styles.containerCard}>
        <Image source={{ uri: item.category.icon }} style={styles.icon} />
        <View style={styles.descriptionAndDate}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
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

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error: {error.message}</Text>
        <Image
          source={require('../../../assets/img/Saly-45.png')}
          style={styles.emptyImage}
        />
      </View>
    );
  }

  if (!transactions.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No transactions available.</Text>
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
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
  item: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'rgba(229, 155, 233, 0.1)',
    borderRadius: 10,
    height: height * 0.2,
    justifyContent: 'center',
    width: width * 0.9,
  },
  containerCard: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  descriptionAndDate: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  textAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    marginBottom: 8,
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

export default TransactionsList;
