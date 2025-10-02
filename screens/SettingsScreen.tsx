import Constants from "expo-constants";
import React, { useState } from "react";
import { Alert, ScrollView, Share, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  List,
  Menu,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addCategory,
  removeCategory,
  setCurrency,
} from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAvailableCurrencies } from "../utils";

export const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currency, categories, expenses } = useAppSelector(
    (state) => state.expenses
  );
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const availableCurrencies = getAvailableCurrencies();

  const handleCurrencyChange = (newCurrency: string) => {
    dispatch(setCurrency(newCurrency));
    setCurrencyMenuVisible(false);
    Alert.alert("Success", `Currency changed to ${newCurrency}`);
  };

  const handleAddCategory = () => {
    Alert.prompt(
      "Add Category",
      "Enter a name for the new category",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: (text?: string) => {
            if (text && text.trim().length > 0) {
              if (categories.includes(text.trim())) {
                Alert.alert("Error", "Category already exists");
              } else {
                dispatch(addCategory(text.trim()));
                Alert.alert("Success", "Category added successfully");
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleRemoveCategory = (category: string) => {
    const expensesInCategory = expenses.filter(
      (e) => e.category === category
    ).length;

    if (expensesInCategory > 0) {
      Alert.alert(
        "Cannot Delete",
        `This category has ${expensesInCategory} expense${
          expensesInCategory !== 1 ? "s" : ""
        }. Please remove or recategorize them first.`
      );
      return;
    }

    Alert.alert(
      "Remove Category",
      `Are you sure you want to remove "${category}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            dispatch(removeCategory(category));
            Alert.alert("Success", "Category removed successfully");
          },
        },
      ]
    );
  };

  const handleExportJSON = async () => {
    try {
      const data = {
        expenses,
        exportDate: new Date().toISOString(),
        currency,
      };

      const jsonString = JSON.stringify(data, null, 2);

      // Share the JSON data
      await Share.share({
        message: jsonString,
        title: "SmartSpend Export",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to export data");
      console.error(error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const header = "Date,Name,Category,Amount,Description\n";
      const rows = expenses
        .map((expense) => {
          const date = new Date(expense.date).toLocaleDateString();
          const description = expense.description?.replace(/,/g, ";") || "";
          return `${date},"${expense.name}","${expense.category}",${expense.amount},"${description}"`;
        })
        .join("\n");

      const csv = header + rows;

      // Share the CSV data
      await Share.share({
        message: csv,
        title: "SmartSpend Export",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to export data");
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const message = `I'm tracking my expenses with SmartSpend!\n\nTotal Expenses: ${currency} ${totalExpenses.toFixed(
        2
      )}\nNumber of Expenses: ${expenses.length}`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="displaySmall" style={styles.pageTitle}>
          Settings
        </Text>

        <List.Section>
          <List.Subheader style={styles.subheader}>General</List.Subheader>

          <Menu
            visible={currencyMenuVisible}
            onDismiss={() => setCurrencyMenuVisible(false)}
            anchor={
              <List.Item
                title="Currency"
                description={currency}
                left={(props) => <List.Icon {...props} icon="currency-usd" />}
                right={(props) => <List.Icon {...props} icon="chevron-down" />}
                onPress={() => setCurrencyMenuVisible(true)}
                style={styles.listItem}
              />
            }
            contentStyle={styles.menuContent}
          >
            {availableCurrencies.map((curr) => (
              <Menu.Item
                key={curr}
                onPress={() => handleCurrencyChange(curr)}
                title={curr}
                titleStyle={
                  currency === curr ? styles.selectedMenuItem : undefined
                }
              />
            ))}
          </Menu>
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader style={styles.subheader}>Categories</List.Subheader>

          <List.Accordion
            title="Manage Categories"
            description={`${categories.length} categories`}
            left={(props) => <List.Icon {...props} icon="tag-multiple" />}
            expanded={showCategories}
            onPress={() => setShowCategories(!showCategories)}
            style={styles.listItem}
          >
            {categories.map((category) => (
              <List.Item
                key={category}
                title={category}
                right={() => (
                  <IconButton
                    icon="close"
                    iconColor="#FF3B30"
                    onPress={() => handleRemoveCategory(category)}
                  />
                )}
                style={styles.categoryItem}
              />
            ))}
          </List.Accordion>
        </List.Section>

        <Button
          mode="outlined"
          onPress={handleAddCategory}
          style={styles.addCategoryButton}
        >
          Add Category
        </Button>

        <Divider />

        <List.Section>
          <List.Subheader style={styles.subheader}>Data Export</List.Subheader>

          <List.Item
            title="Export as JSON"
            description="Export all data in JSON format"
            left={(props) => <List.Icon {...props} icon="code-json" />}
            onPress={handleExportJSON}
            style={styles.listItem}
          />

          <List.Item
            title="Export as CSV"
            description="Export expenses in CSV format"
            left={(props) => <List.Icon {...props} icon="file-delimited" />}
            onPress={handleExportCSV}
            style={styles.listItem}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader style={styles.subheader}>About</List.Subheader>

          <List.Item
            title="Share App"
            description="Share SmartSpend with friends"
            left={(props) => <List.Icon {...props} icon="share-variant" />}
            onPress={handleShare}
            style={styles.listItem}
          />

          <List.Item
            title="Version"
            description={Constants.expoConfig?.version || "1.0.0"}
            left={(props) => <List.Icon {...props} icon="information" />}
            style={styles.listItem}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    color: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  subheader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    textTransform: "uppercase",
  },
  listItem: {
    backgroundColor: "#FFFFFF",
  },
  categoryItem: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 32,
  },
  menuContent: {
    backgroundColor: "#FFFFFF",
  },
  selectedMenuItem: {
    color: "#007AFF",
    fontWeight: "600",
  },
  addCategoryButton: {
    marginVertical: 16,
    marginHorizontal: 16,
    borderColor: "#007AFF",
  },
});
