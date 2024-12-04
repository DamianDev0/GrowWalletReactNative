import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import useTransactions from '../hooks/useTransactions';
import {DataItem} from '../../../interfaces/transaction.interface';

const {width, height} = Dimensions.get('screen');

const Transactions = () => {
  const {transactions, loading, error} = useTransactions();

  const renderItem = ({item}: {item: DataItem}) => (
    <View style={styles.item}>
      <View style={styles.containerCard}>
        <Image source={{uri: item.category.icon}} style={styles.icon} />
        <View style={styles.descriptionAndDate}>
          <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.description}
          </Text>
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

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(229, 155, 233, 0.1)',
  },
  containerCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.08,
  },
  descriptionAndDate: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: width * 0.05,
  },
  text: {
    fontSize: 16,
    color: '#FFF',
  },
  textTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffff',
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
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginTop: 8,
    marginHorizontal: -30,
  },
  loading: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 5,
    marginBottom: 16,
  },
});

export default Transactions;
