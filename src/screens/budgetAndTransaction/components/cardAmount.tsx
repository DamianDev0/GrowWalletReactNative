import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useBudgetByCategory from '../hooks/useAmount';

const {width, height} = Dimensions.get('screen');

interface BudgetCardProps {
  categoryId: string;
  nameCategory: string
  onBudgetIdChange: (id: string | null) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  categoryId,
  onBudgetIdChange,
  nameCategory,
}) => {
  const {budget, loading} = useBudgetByCategory(categoryId, nameCategory);

  useEffect(() => {
    if (budget) {
      onBudgetIdChange(budget.id);
    } else {
      onBudgetIdChange(null);
    }
  }, [budget, onBudgetIdChange]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1b4f72', '#4a235a']}
        start={{x: 1, y: 2}}
        end={{x: 0, y: 1}}
        style={styles.card}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : budget ? (
          <>
            <Image
              source={require('../../../assets/img/piggy-bank-icon.png')}
              style={styles.cardImage}
            />
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>${budget.amount}</Text>
            </View>
            <View style={styles.containerInfo}>
              <Text style={styles.period}>{budget.period}</Text>
              <Text style={styles.dates}>
                {budget.startDate} - {budget.endDate}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.loading}>No budget available</Text>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 0},
  card: {
    width: width * 0.9,
    height: height * 0.15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    shadowColor: '#ffff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  cardImage: {
    width: width * 0.23,
    height: height * 0.17,
    resizeMode: 'contain',
  },
  containerInfo: {
    flex: 0.51,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 70,
    width: width * 0.4,
    marginBottom: 10,
    marginTop: 10,
  },
  amount: {fontSize: 25, fontWeight: 'bold', color: '#FFFF', letterSpacing: 1},
  period: {fontSize: 13, color: '#FFF', marginBottom: 5, fontWeight: 'bold'},
  dates: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'ultralight',
    marginTop: 5,
    width: width * 0.4,
    textAlign: 'left',
    marginRight: 30,
  },
  loading: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  amountContainer: {flex: 0.9, justifyContent: 'center', alignItems: 'center'},
});

export default BudgetCard;
