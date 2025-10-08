import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button, Menu, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { addExpense, updateExpense } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateExpenseName,
} from "../utils";

type AddExpenseScreenProps = {
  navigation: any;
  route: any;
};

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { categories, currency } = useAppSelector((state) => state.expenses);
  const existingExpense = route.params?.expense;

  const [name, setName] = useState(existingExpense?.name || "");
  const [amount, setAmount] = useState(
    existingExpense?.amount.toString() || ""
  );
  const [category, setCategory] = useState(existingExpense?.category || "");
  const [selectedDate, setSelectedDate] = useState(
    existingExpense ? new Date(existingExpense.date) : new Date()
  );
  const [selectedTime, setSelectedTime] = useState(
    existingExpense ? new Date(existingExpense.date) : new Date()
  );
  const [description, setDescription] = useState(
    existingExpense?.description || ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [errors, setErrors] = useState({
    name: null as string | null,
    amount: null as string | null,
    category: null as string | null,
    date: null as string | null,
  });

  useEffect(() => {
    navigation.setOptions({
      title: existingExpense ? "Edit Expense" : "Add Expense",
    });
  }, [existingExpense, navigation]);

  const handleSave = () => {
    // Combine selectedDate and selectedTime into a single Date object
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(selectedTime.getHours());
    combinedDate.setMinutes(selectedTime.getMinutes());
    combinedDate.setSeconds(0);
    combinedDate.setMilliseconds(0);

    const nameError = validateExpenseName(name);
    const amountError = validateAmount(amount);
    const categoryError = validateCategory(category);
    const dateError = validateDate(combinedDate);

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
      date: combinedDate.toISOString(),
      description: description.trim(),
    };

    if (existingExpense) {
      dispatch(updateExpense({ ...expenseData, id: existingExpense.id }));
      Alert.alert("Success", "Expense updated successfully");
    } else {
      dispatch(addExpense(expenseData));
      Alert.alert("Success", "Expense added successfully");
    }

    navigation.goBack();
  };

  const handleDateChange = (event: any, pickedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "set" && pickedDate) {
      setSelectedDate(pickedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="displaySmall" style={styles.pageTitle}>
          {existingExpense ? "Edit Expense" : "Add Expense"}
        </Text>

        <View style={styles.form}>
          {/* Basic Info Section */}
          <View style={styles.section}>
            {/* Name Input */}
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Expense name"
                placeholderTextColor="#8E8E93"
                maxLength={100}
              />
            </View>

            <View style={styles.divider} />

            {/* Amount Input */}
            <View style={styles.row}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>
                  {currency === "USD" ? "$" : currency}
                </Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="#8E8E93"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Category Picker */}
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Pressable
                  style={styles.row}
                  onPress={() => setMenuVisible(true)}
                >
                  <Text style={styles.label}>Category</Text>
                  <View style={styles.valueContainer}>
                    <Text
                      style={[
                        styles.value,
                        !category && styles.placeholderValue,
                      ]}
                    >
                      {category || "Select category"}
                    </Text>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </Pressable>
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
                  titleStyle={
                    category === cat ? styles.selectedMenuItem : undefined
                  }
                />
              ))}
            </Menu>

            <View style={styles.divider} />

            {/* Date Picker */}
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.dateTimeContainer}>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => {
                    setShowTimePicker(false);
                    setShowDatePicker(true);
                  }}
                >
                  <Text style={styles.dateButtonText}>
                    {selectedDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.timeButton}
                  onPress={() => {
                    setShowDatePicker(false);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timeButtonText}>
                    {selectedTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Text>
                </Pressable>
              </View>
            </View>

            {showDatePicker && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="inline"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              </View>
            )}

            {showTimePicker && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={selectedTime}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                />
              </View>
            )}
          </View>

          {/* Description Section */}
          <View style={[styles.section, styles.descriptionSection]}>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Add notes (optional)"
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />
          </View>

          {/* Error Messages */}
          {(errors.name || errors.amount || errors.category || errors.date) && (
            <View style={styles.errorContainer}>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
              {errors.category && (
                <Text style={styles.errorText}>{errors.category}</Text>
              )}
              {errors.date && (
                <Text style={styles.errorText}>{errors.date}</Text>
              )}
            </View>
          )}

          {/* Save Button */}
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            contentStyle={styles.saveButtonContent}
            labelStyle={styles.saveButtonLabel}
          >
            {existingExpense ? "Update Expense" : "Save Expense"}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    color: "#000000",
  },
  form: {
    padding: 16,
    paddingTop: 0,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  label: {
    fontSize: 17,
    color: "#000000",
    flex: 0,
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#000000",
    textAlign: "right",
    paddingVertical: 0,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  currencySymbol: {
    fontSize: 17,
    color: "#000000",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 17,
    color: "#000000",
    textAlign: "right",
    flex: 1,
    paddingVertical: 0,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  value: {
    fontSize: 17,
    color: "#000000",
    textAlign: "right",
  },
  placeholderValue: {
    color: "#8E8E93",
  },
  chevron: {
    fontSize: 20,
    color: "#C7C7CC",
    marginLeft: 8,
    fontWeight: "400",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#C6C6C8",
    marginLeft: 16,
  },
  descriptionSection: {
    minHeight: 120,
    padding: 0,
  },
  descriptionInput: {
    fontSize: 17,
    color: "#000000",
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  menuContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  selectedMenuItem: {
    color: "#007AFF",
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#FFE5E5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    marginBottom: 4,
  },
  saveButton: {
    marginTop: 4,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#007AFF",
  },
  saveButtonContent: {
    height: 56,
  },
  saveButtonLabel: {
    fontSize: 17,
    fontWeight: "600",
    textTransform: "none",
  },
  datePickerContainer: {
    paddingVertical: 8,
  },
  pickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateButton: {
    backgroundColor: "#E5E5EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 17,
    fontWeight: "400",
  },
  timeButton: {
    backgroundColor: "#E5E5EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 17,
    fontWeight: "400",
  },
});
