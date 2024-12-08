import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useBudgetByCategory from '../hooks/useAmount';

const {width, height} = Dimensions.get('screen');

interface BudgetCardProps {
  categoryId: string;
  onBudgetIdChange: (budgetId: string | null) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  categoryId,
  onBudgetIdChange,
}) => {
  const budget = useBudgetByCategory(categoryId);

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
        colors={['#aed6f1', '#8a2be2']}
        start={{x: 0, y: 0}}
        end={{x: 2, y: 1}}
        style={styles.card}>
        {budget ? (
          <>
            <Image
              source={require('../../../assets/img/piggy-bank-icon.png')}
              style={styles.cardImage}
            />
            <View style={styles.containerInfo}>
              <Text style={styles.period}>{budget.period}</Text>
              <Text style={styles.dates}>
                {budget.startDate} - {budget.endDate}
              </Text>
            </View>
            <Text style={styles.amount}>${budget.amount}</Text>
          </>
        ) : (
          <Text style={styles.loading}>No budget available</Text>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 0,
  },
  card: {
    width: width * 0.9,
    height: height * 0.15,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: width * 0.23,
    height: height * 0.17,
    resizeMode: 'contain',
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  amount: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFF',
    letterSpacing: 1,
  },
  period: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'ultralight',
    marginTop: 5,
    width: width * 0.4,
    textAlign: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default BudgetCard;
