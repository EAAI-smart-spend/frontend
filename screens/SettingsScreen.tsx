import Constants from "expo-constants";
import React from "react";
import { Alert, ScrollView, Share, StyleSheet } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../store/hooks";

type SettingsScreenProps = {
  navigation: any;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const { currency, categories, expenses } = useAppSelector(
    (state) => state.expenses
  );

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

          <List.Item
            title="Currency"
            description={currency}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate("ManageCurrency")}
            style={styles.listItem}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader style={styles.subheader}>Categories</List.Subheader>

          <List.Item
            title="Manage Categories"
            description={`${categories.length} categories`}
            left={(props) => <List.Icon {...props} icon="tag-multiple" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate("ManageCategories")}
            style={styles.listItem}
          />
        </List.Section>

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
});
