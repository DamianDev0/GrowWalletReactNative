import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBudgetAndTransaction from './components/headerBudgedAndTransaction';
import BudgetCard from './components/cardAmount';

import { NavigationParams } from '../../types/navigation.types';

type BudgetAndTransactionRouteProp = RouteProp<
  NavigationParams,
  'BudgetAndTransactionScreen'
>;

const BudgetAndTransactionScreen = () => {
  const route = useRoute<BudgetAndTransactionRouteProp>();
  const { name, description, icon, id } = route.params;

  return (
    <LinearGradient
      colors={['#000000', '#6a1b9a', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <HeaderBudgetAndTransaction
        name={name}
        description={description}
        icon={icon}
        categoryId={id}
      />
      <View style={styles.cardContainer}>
        <BudgetCard categoryId={id} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BudgetAndTransactionScreen;
