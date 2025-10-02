import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface ChartData {
  name: string;
  value: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
}

interface ChartViewProps {
  title: string;
  data: ChartData[];
  type: 'pie' | 'bar';
  currency?: string;
}

export const ChartView: React.FC<ChartViewProps> = ({
  title,
  data,
  type,
  currency = '$',
}) => {
  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600',
    },
  };

  const pieData = data.map((item) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: item.legendFontColor || '#7F7F7F',
    legendFontSize: item.legendFontSize || 12,
  }));

  const barData = {
    labels: data.map((item) => item.name.substring(0, 8)),
    datasets: [
      {
        data: data.map((item) => item.value),
        colors: data.map((item) => () => item.color),
      },
    ],
  };

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>
        <View style={styles.chartContainer}>
          {type === 'pie' ? (
            <PieChart
              data={pieData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
              hasLegend={true}
            />
          ) : (
            <BarChart
              data={barData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              withInnerLines={false}
              showBarTops={false}
              fromZero
              withCustomBarColorFromData
              flatColor
              yAxisLabel={currency}
              yAxisSuffix=""
              style={styles.barChart}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    marginBottom: 16,
    color: '#000000',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barChart: {
    borderRadius: 16,
  },
});
