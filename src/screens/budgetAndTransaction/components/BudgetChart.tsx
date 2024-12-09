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
  const {budgetStats, loading} = useBudgetStats(budgetId);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFFF" />;
  }

  if (!budgetStats) {
    return <Text style={styles.noDataText}>No budget stats available</Text>;
  }

  const data = {
    labels: ['Spent', 'Remaining', 'Daily Rate', 'Avg Daily'],
    datasets: [
      {
        data: [
          Math.max(0, budgetStats.totalAmountSpent),
          Math.max(0, budgetStats.remainingBudgetAmount),
          Math.max(0, budgetStats.dailySpendingRate),
          Math.max(0, budgetStats.averageDailySpending),
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      {budgetStats.warningMessage && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningMessage}>
            {budgetStats.warningMessage}
          </Text>
        </View>
      )}
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
          fillShadowGradient: '#85c1e9',
          fillShadowGradientOpacity: 0.9,
          decimalPlaces: 0,
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
  warningContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
    maxWidth: '100%',
    marginTop: 10,
  },
  warningText: {
    color: 'orange',
    fontSize: 12,
  },
  warningMessage: {
    color: 'orange',
    fontSize: 10,
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default BudgetChart;
