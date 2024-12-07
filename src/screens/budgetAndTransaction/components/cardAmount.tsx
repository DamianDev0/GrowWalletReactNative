import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import useBudgetByCategory from '../hooks/useAmount';

const {width} = Dimensions.get('screen');

interface BudgetCardProps {
  categoryId: string;
}

const BudgetCard: React.FC<BudgetCardProps> = ({categoryId}) => {
  const budget = useBudgetByCategory(categoryId);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {budget ? (
          <>
            <Text style={styles.amount}>${budget.amount}</Text>
            <Text style={styles.period}>{budget.period}</Text>
            <Text style={styles.dates}>
              {budget.startDate} - {budget.endDate}
            </Text>
          </>
        ) : (
          <Text style={styles.loading}>Not budget Avalible</Text>
        )}
      </View>
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
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFF',
    marginBottom: 8,
  },
  period: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 4,
  },
  dates: {
    fontSize: 14,
    color: '#ccc',
  },
  loading: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default BudgetCard;
