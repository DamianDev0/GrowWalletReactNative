import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBudgetAndTransaction from './components/headerBudgedAndTransaction'; // Importamos el componente

import {NavigationParams} from '../../types/navigation.types';

type BudgetAndTransactionRouteProp = RouteProp<
  NavigationParams,
  'BudgetAndTransactionScreen'
>;

const BudgetAndTransactionScreen = () => {
  const route = useRoute<BudgetAndTransactionRouteProp>();
  const {name, description, icon} = route.params;

  return (
    <LinearGradient
      colors={['#000000', '#6a1b9a', '#000000']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <HeaderBudgetAndTransaction
        name={name}
        description={description}
        icon={icon}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BudgetAndTransactionScreen;
