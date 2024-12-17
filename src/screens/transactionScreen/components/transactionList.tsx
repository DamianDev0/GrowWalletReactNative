import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SectionList,
  Dimensions,
} from 'react-native';
import {useGroupedTransactions} from '../hooks/useGroupedTransactions';
import {DataItem} from '../../../interfaces/transaction.interface';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const formatCurrency = (amount: string, currency: string) => {
  const numericAmount = parseFloat(amount);
  return numericAmount.toLocaleString('es-CO', {
    style: 'currency',
    currency: currency,
  });
};

const TransactionsList: React.FC = () => {
  const {sections, loading, error, currentMonth} = useGroupedTransactions();

  const renderItem = ({item}: {item: DataItem}) => {
    const currency = item.wallet?.currency || 'COP';

    return (
      <LinearGradient
        style={styles.item}
        colors={['#2b1557', '#000']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 3.8}}>
        <View>
          <View style={styles.containerCard}>
            <View>
              <Image source={{uri: item.category.icon}} style={styles.icon} />
            </View>
            <View style={styles.details}>
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text
                style={styles.textDescription}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text style={styles.textDate}>{item.category.name}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.textAmount}>
                {formatCurrency(item.amount, currency)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Not transaction available</Text>
        <Image
          source={require('../../../assets/img/Saly-45.png')}
          style={styles.emptyImage}
        />
      </View>
    );
  }

  if (!sections.length) {
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
      <Text style={styles.titleTransaction}>
        Transactions of {currentMonth}
      </Text>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        style={styles.sectionList}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
  },
  listContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 80,
  },
  item: {
    margin: 8,
    padding: 16,
    borderRadius: 10,
    height: height * 0.13,
    justifyContent: 'center',
    width: width * 0.9,
  },
  containerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    gap: 5,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  textDescription: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 4,
  },
  textDate: {
    fontSize: 10,
    color: '#ccc',
    textAlign: 'left',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  textAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  icon: {
    width: width * 0.18,
    height: height * 0.1,
    resizeMode: 'contain',
  },
  amountContainer: {
    marginLeft: 'auto',
  },
  sectionList: {
    paddingBottom: 80,
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
  sectionHeader: {
    padding: 10,
    alignItems: 'baseline',
    width: width,
    paddingHorizontal: 30,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
});

export default TransactionsList;
