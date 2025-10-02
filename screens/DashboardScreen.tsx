import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { ChartView, SummaryCard } from '../components';
import { formatCurrency, getStartOfWeek, getStartOfMonth, getCurrencySymbol } from '../utils';

export const DashboardScreen: React.FC = () => {
  const { expenses, currency } = useAppSelector((state) => state.expenses);
  const [period, setPeriod] = React.useState('week');

  const filteredExpenses = useMemo(() => {
    if (period === 'week') {
      const startOfWeek = getStartOfWeek();
      return expenses.filter((expense) => new Date(expense.date) >= startOfWeek);
    } else if (period === 'month') {
      const startOfMonth = getStartOfMonth();
      return expenses.filter((expense) => new Date(expense.date) >= startOfMonth);
    }
    return expenses;
  }, [expenses, period]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const categoryData = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    
    filteredExpenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#F7DC6F',
      '#BB8FCE',
      '#85C1E2',
      '#95A5A6',
    ];

    return Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }));
  }, [filteredExpenses]);

  const averageExpense = useMemo(() => {
    return filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
  }, [filteredExpenses, totalExpenses]);

  const highestExpense = useMemo(() => {
    return filteredExpenses.length > 0
      ? Math.max(...filteredExpenses.map((e) => e.amount))
      : 0;
  }, [filteredExpenses]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text variant="displaySmall" style={styles.pageTitle}>
          Dashboard
        </Text>
        
        <View style={styles.periodSelector}>
          <SegmentedButtons
            value={period}
            onValueChange={setPeriod}
            buttons={[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'all', label: 'All Time' },
            ]}
            style={styles.segmentedButtons}
            theme={{ colors: { secondaryContainer: '#007AFF', onSecondaryContainer: '#FFFFFF' } }}
          />
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryCards}>
            <SummaryCard
              title="Total Spent"
              amount={formatCurrency(totalExpenses, currency)}
              subtitle={`${filteredExpenses.length} expense${filteredExpenses.length !== 1 ? 's' : ''}`}
              color="#FF3B30"
            />
            <SummaryCard
              title="Average"
              amount={formatCurrency(averageExpense, currency)}
              subtitle="per expense"
              color="#007AFF"
            />
          </View>
          <View style={styles.summaryCards}>
            <SummaryCard
              title="Highest"
              amount={formatCurrency(highestExpense, currency)}
              subtitle="single expense"
              color="#FF9500"
            />
            <SummaryCard
              title="Categories"
              amount={categoryData.length.toString()}
              subtitle="used"
              color="#34C759"
            />
          </View>
        </View>

        {categoryData.length > 0 ? (
          <>
            <ChartView
              title="Spending by Category"
              data={categoryData}
              type="pie"
              currency={getCurrencySymbol(currency)}
            />
            <ChartView
              title="Category Comparison"
              data={categoryData.slice(0, 5)}
              type="bar"
              currency={getCurrencySymbol(currency)}
            />
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No data yet
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Add some expenses to see your spending analytics
            </Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  periodSelector: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  segmentedButtons: {
    backgroundColor: '#F2F2F7',
  },
  summarySection: {
    marginTop: 16,
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#8E8E93',
  },
  bottomPadding: {
    height: 32,
  },
});
