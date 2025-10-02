import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { Button, Menu, TextInput as PaperInput, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addExpense, updateExpense } from '../store/expensesSlice';
import { FormInput } from '../components';
import { validateExpenseName, validateAmount, validateCategory, validateDate } from '../utils';

type AddExpenseScreenProps = {
  navigation: any;
  route: any;
};

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { categories, currency } = useAppSelector((state) => state.expenses);
  const existingExpense = route.params?.expense;

  const [name, setName] = useState(existingExpense?.name || '');
  const [amount, setAmount] = useState(existingExpense?.amount.toString() || '');
  const [category, setCategory] = useState(existingExpense?.category || '');
  const [date, setDate] = useState(existingExpense ? new Date(existingExpense.date) : new Date());
  const [description, setDescription] = useState(existingExpense?.description || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [errors, setErrors] = useState({
    name: null as string | null,
    amount: null as string | null,
    category: null as string | null,
    date: null as string | null,
  });

  useEffect(() => {
    navigation.setOptions({
      title: existingExpense ? 'Edit Expense' : 'Add Expense',
    });
  }, [existingExpense, navigation]);

  const handleSave = () => {
    const nameError = validateExpenseName(name);
    const amountError = validateAmount(amount);
    const categoryError = validateCategory(category);
    const dateError = validateDate(date);

    setErrors({
      name: nameError,
      amount: amountError,
      category: categoryError,
      date: dateError,
    });

    if (nameError || amountError || categoryError || dateError) {
      return;
    }

    const expenseData = {
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date: date.toISOString(),
      description: description.trim(),
    };

    if (existingExpense) {
      dispatch(updateExpense({ ...expenseData, id: existingExpense.id }));
      Alert.alert('Success', 'Expense updated successfully');
    } else {
      dispatch(addExpense(expenseData));
      Alert.alert('Success', 'Expense added successfully');
    }

    navigation.goBack();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text variant="displaySmall" style={styles.pageTitle}>
          Add Expense
        </Text>
        
        <View style={styles.form}>
          <FormInput
            label="Expense Name *"
            value={name}
            onChangeText={setName}
            error={errors.name}
            placeholder="e.g., Lunch at restaurant"
            maxLength={100}
          />

          <FormInput
            label="Amount *"
            value={amount}
            onChangeText={setAmount}
            error={errors.amount}
            placeholder="0.00"
            keyboardType="numeric"
            left={<PaperInput.Affix text={currency === 'USD' ? '$' : currency} />}
          />

          <View style={styles.menuContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <PaperInput
                  label="Category *"
                  value={category}
                  mode="outlined"
                  editable={false}
                  right={<PaperInput.Icon icon="chevron-down" />}
                  onPressIn={() => setMenuVisible(true)}
                  error={!!errors.category}
                  style={styles.input}
                  outlineStyle={styles.outline}
                  theme={{
                    colors: {
                      primary: '#007AFF',
                      error: '#FF3B30',
                    },
                    roundness: 12,
                  }}
                />
              }
              contentStyle={styles.menuContent}
            >
              {categories.map((cat) => (
                <Menu.Item
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    setMenuVisible(false);
                  }}
                  title={cat}
                  titleStyle={category === cat ? styles.selectedMenuItem : undefined}
                />
              ))}
            </Menu>
          </View>

          <View style={styles.dateContainer}>
            <PaperInput
              label="Date *"
              value={date.toLocaleDateString()}
              mode="outlined"
              editable={false}
              right={<PaperInput.Icon icon="calendar" />}
              onPressIn={() => setShowDatePicker(true)}
              error={!!errors.date}
              style={styles.input}
              outlineStyle={styles.outline}
              theme={{
                colors: {
                  primary: '#007AFF',
                  error: '#FF3B30',
                },
                roundness: 12,
              }}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <FormInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Add notes about this expense"
            multiline
            numberOfLines={3}
            maxLength={500}
          />

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
            labelStyle={styles.saveButtonLabel}
          >
            {existingExpense ? 'Update Expense' : 'Save Expense'}
          </Button>
        </View>
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
    marginBottom: 16,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  menuContainer: {
    marginBottom: 16,
  },
  menuContent: {
    backgroundColor: '#FFFFFF',
  },
  selectedMenuItem: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dateContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  outline: {
    borderWidth: 1,
  },
  saveButton: {
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#007AFF',
  },
  saveButtonContent: {
    height: 56,
  },
  saveButtonLabel: {
    fontSize: 17,
    fontWeight: '600',
    textTransform: 'none',
  },
});
