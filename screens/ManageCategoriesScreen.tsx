import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeCategory } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type ManageCategoriesScreenProps = {
  navigation: any;
};

export const ManageCategoriesScreen: React.FC<ManageCategoriesScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { categories, expenses } = useAppSelector((state) => state.expenses);

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

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text variant="bodyMedium" style={styles.description}>
            Manage your expense categories. You can add new categories or remove
            existing ones.
          </Text>

          <View style={styles.categoriesContainer}>
            {categories.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🏷️</Text>
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  No categories yet
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtitle}>
                  Add your first category to get started
                </Text>
              </View>
            ) : (
              <>
                {categories.map((category) => {
                  const categoryExpenses = expenses.filter(
                    (e) => e.category === category
                  ).length;
                  return (
                    <List.Item
                      key={category}
                      title={category}
                      description={`${categoryExpenses} expense${
                        categoryExpenses !== 1 ? "s" : ""
                      }`}
                      left={(props) => <List.Icon {...props} icon="tag" />}
                      right={() => (
                        <IconButton
                          icon="close"
                          iconColor="#FF3B30"
                          onPress={() => handleRemoveCategory(category)}
                        />
                      )}
                      style={styles.categoryItem}
                    />
                  );
                })}
              </>
            )}
          </View>
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
  content: {
    padding: 16,
  },
  description: {
    color: "#8E8E93",
    marginBottom: 24,
    lineHeight: 20,
  },
  categoriesContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  categoryItem: {
    backgroundColor: "#FFFFFF",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#000000",
  },
  emptySubtitle: {
    textAlign: "center",
    color: "#8E8E93",
  },
});
