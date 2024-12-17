import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBudgetAndTransaction from './components/headerBudgedAndTransaction';
import BudgetCard from './components/cardAmount';
import BudgetChart from './components/BudgetChart';

import {NavigationParams} from '../../types/navigation.types';

type BudgetAndTransactionRouteProp = RouteProp<
  NavigationParams,
  'BudgetAndTransactionScreen'
>;

const BudgetAndTransactionScreen = () => {
  const route = useRoute<BudgetAndTransactionRouteProp>();
  const {name, description, icon, id} = route.params;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    id,
  );

  return (
    <LinearGradient
      colors={['#000000', '#4a235a', '#000000']}
      start={{x: 2, y: 7}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <HeaderBudgetAndTransaction
        name={name}
        description={description}
        icon={icon}
        categoryId={id}
        budgetId={selectedCategoryId || ''}
      />
      <View style={styles.cardContainer}>
        <BudgetCard
          categoryId={id}
          nameCategory={name}
          onBudgetIdChange={setSelectedCategoryId}
        />
      </View>
      {selectedCategoryId && (
        <View style={styles.chartContainer}>
          <BudgetChart budgetId={selectedCategoryId} />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BudgetAndTransactionScreen;
