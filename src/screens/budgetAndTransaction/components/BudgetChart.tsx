import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import useBudgetStats from '../hooks/useBudgetStats';

interface BudgetChartProps {
  budgetId: string;
}

const {width, height} = Dimensions.get('window');

const BudgetChart: React.FC<BudgetChartProps> = ({budgetId}) => {
  const {budgetStats, loading, error} = useBudgetStats(budgetId);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!budgetStats) {
    return <Text style={styles.noDataText}>No budget stats available</Text>;
  }

  const data = {
    labels: ['Spent', 'Remaining', 'Daily Rate', 'Avg Daily'],
    datasets: [
      {
        data: [
          budgetStats.totalAmountSpent,
          budgetStats.remainingBudgetAmount,
          budgetStats.dailySpendingRate,
          budgetStats.averageDailySpending,
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={width * 0.9}
        height={height * 0.4}
        showBarTops={true}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: 'rgba(255,255,255,0.01)',
          backgroundGradientTo: 'rgba(255,255,255,0.01)',
          backgroundGradientFromOpacity: 0.0,
          backgroundGradientToOpacity: 0.0,
          fillShadowGradient: '#5dade2',
          fillShadowGradientOpacity: 0.7,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => 'white',
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fill: 'white',
          },
          propsForBackgroundLines: {
            stroke: 'transparent',
          },
        }}
        verticalLabelRotation={0}
        fromZero={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default BudgetChart;
