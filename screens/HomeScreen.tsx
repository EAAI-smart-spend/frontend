import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../store/hooks';
import { SummaryCard, ExpenseCard } from '../components';
import { formatCurrency, getStartOfDay, getStartOfWeek } from '../utils';

type HomeScreenProps = {
  navigation: any;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { expenses, currency } = useAppSelector((state) => state.expenses);

  const todayExpenses = useMemo(() => {
    const today = getStartOfDay();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= today;
    });
  }, [expenses]);

  const weekExpenses = useMemo(() => {
    const startOfWeek = getStartOfWeek();
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfWeek;
    });
  }, [expenses]);

  const todayTotal = useMemo(() => {
    return todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [todayExpenses]);

  const weekTotal = useMemo(() => {
    return weekExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [weekExpenses]);

  const recentExpenses = expenses.slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text variant="displaySmall" style={styles.pageTitle}>
          SmartSpend
        </Text>
        <View style={styles.summarySection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Overview
          </Text>
          <View style={styles.summaryCards}>
            <SummaryCard
              title="Today"
              amount={formatCurrency(todayTotal, currency)}
              subtitle={`${todayExpenses.length} expense${todayExpenses.length !== 1 ? 's' : ''}`}
              color="#007AFF"
            />
            <SummaryCard
              title="This Week"
              amount={formatCurrency(weekTotal, currency)}
              subtitle={`${weekExpenses.length} expense${weekExpenses.length !== 1 ? 's' : ''}`}
              color="#34C759"
            />
          </View>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Recent Expenses
            </Text>
            {expenses.length > 5 && (
              <Text
                variant="bodyMedium"
                style={styles.viewAll}
                onPress={() => navigation.navigate('Expenses')}
              >
                View All
              </Text>
            )}
          </View>

          {recentExpenses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                No expenses yet
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Tap the + button to add your first expense
              </Text>
            </View>
          ) : (
            recentExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                currency={currency}
                onPress={() => navigation.navigate('AddExpense', { expense })}
              />
            ))
          )}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')}
        color="#FFFFFF"
      />
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
    marginBottom: 16,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  summarySection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#000000',
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  recentSection: {
    marginTop: 24,
    paddingBottom: 100,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  viewAll: {
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007AFF',
  },
});
