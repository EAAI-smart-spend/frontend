import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deleteExpense } from '../store/expensesSlice';
import { ExpenseCard } from '../components';
import type { Expense } from '../store/expensesSlice';

type ExpensesScreenProps = {
  navigation: any;
};

export const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { expenses, currency } = useAppSelector((state) => state.expenses);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExpenses = expenses.filter((expense) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.category.toLowerCase().includes(searchLower) ||
      expense.description?.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteExpense = (expense: Expense) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expense.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteExpense(expense.id)),
        },
      ]
    );
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <ExpenseCard
      expense={item}
      currency={currency}
      onPress={() => navigation.navigate('AddExpense', { expense: item })}
      onDelete={() => handleDeleteExpense(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text variant="displaySmall" style={styles.pageTitle}>
        Expenses
      </Text>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search expenses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#007AFF"
          theme={{ colors: { primary: '#007AFF' } }}
        />
      </View>

      {filteredExpenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>
            {searchQuery ? '🔍' : '📝'}
          </Text>
          <Text variant="titleMedium" style={styles.emptyTitle}>
            {searchQuery ? 'No expenses found' : 'No expenses yet'}
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtitle}>
            {searchQuery
              ? 'Try a different search term'
              : 'Tap the + button to add your first expense'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredExpenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
    marginBottom: 8,
    color: '#000000',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchbar: {
    backgroundColor: '#F2F2F7',
    elevation: 0,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
