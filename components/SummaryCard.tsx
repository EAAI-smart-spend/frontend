import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface SummaryCardProps {
  title: string;
  amount: string;
  icon?: string;
  color?: string;
  subtitle?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  subtitle,
  color = '#007AFF',
}) => {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="bodyMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="headlineMedium" style={[styles.amount, { color }]}>
          {amount}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  title: {
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  amount: {
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 12,
  },
});
