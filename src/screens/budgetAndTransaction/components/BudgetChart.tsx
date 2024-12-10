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
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={width * 0.9}
          height={height * 0.39}
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
        <View style={styles.daysRemainingContainer}>
          <Text style={styles.daysRemainingText}>
            {budgetStats.daysRemaining}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  warningContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
    maxWidth: width,
    marginTop: 10,
  },
  warningMessage: {
    color: 'orange',
    fontSize: 10,
  },
  noDataText: {
    color: 'gray',
    fontSize: 16,
  },
  chartContainer: {
    position: 'relative',
    width: width,
    alignItems: 'center',
  },
  daysRemainingContainer: {
    position: 'absolute',
    top: -100,
    left: width * 0.75,
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysRemainingText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BudgetChart;
