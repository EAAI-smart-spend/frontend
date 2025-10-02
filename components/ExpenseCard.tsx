import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Expense } from '../store/expensesSlice';
import { formatDate, formatCurrency } from '../utils';

interface ExpenseCardProps {
  expense: Expense;
  currency: string;
  onPress?: () => void;
  onDelete?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  currency,
  onPress,
  onDelete,
}) => {
  const getCategoryIcon = (category: string): string => {
    const iconMap: { [key: string]: string } = {
      'Food & Dining': 'food',
      'Transportation': 'car',
      'Shopping': 'shopping',
      'Entertainment': 'movie',
      'Bills & Utilities': 'receipt',
      'Healthcare': 'medical-bag',
      'Education': 'school',
      'Travel': 'airplane',
      'Other': 'dots-horizontal',
    };
    return iconMap[category] || 'cash';
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Food & Dining': '#FF6B6B',
      'Transportation': '#4ECDC4',
      'Shopping': '#45B7D1',
      'Entertainment': '#FFA07A',
      'Bills & Utilities': '#98D8C8',
      'Healthcare': '#F7DC6F',
      'Education': '#BB8FCE',
      'Travel': '#85C1E2',
      'Other': '#95A5A6',
    };
    return colorMap[category] || '#3498DB';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <View style={styles.cardContent}>
          <View style={styles.leftContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getCategoryColor(expense.category) + '20' },
              ]}
            >
              <IconButton
                icon={getCategoryIcon(expense.category)}
                size={24}
                iconColor={getCategoryColor(expense.category)}
                style={styles.icon}
              />
            </View>
            <View style={styles.textContent}>
              <Text variant="titleMedium" style={styles.name}>
                {expense.name}
              </Text>
              <Text variant="bodySmall" style={styles.category}>
                {expense.category} • {formatDate(expense.date)}
              </Text>
              {expense.description && (
                <Text variant="bodySmall" style={styles.description} numberOfLines={1}>
                  {expense.description}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text variant="titleLarge" style={styles.amount}>
              {formatCurrency(expense.amount, currency)}
            </Text>
            {onDelete && (
              <IconButton
                icon="delete"
                size={20}
                iconColor="#FF3B30"
                onPress={onDelete}
                style={styles.deleteButton}
              />
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    margin: 0,
  },
  textContent: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    marginBottom: 2,
  },
  category: {
    color: '#8E8E93',
    marginTop: 2,
  },
  description: {
    color: '#8E8E93',
    marginTop: 2,
    fontStyle: 'italic',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '700',
    color: '#007AFF',
  },
  deleteButton: {
    margin: 0,
    marginTop: -4,
  },
});
