import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import {
  ManageCategoriesScreen,
  ManageCurrencyScreen,
  OnboardingScreen,
} from "../screens";
import { addCategory } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const ManageCategoriesHeader = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.expenses);

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

  return (
    <Pressable onPress={handleAddCategory} style={styles.headerButton}>
      {({ pressed }) => (
        <Text style={[styles.headerButtonText, { opacity: pressed ? 0.5 : 1 }]}>
          +
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerButtonText: {
    fontSize: 28,
    color: "#007AFF",
    fontWeight: "300",
    lineHeight: 28,
  },
});

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="ManageCategories"
        component={ManageCategoriesScreen}
        options={{
          headerShown: true,
          headerTitle: "Categories",
          headerBackTitle: "Back",
          headerRight: () => <ManageCategoriesHeader />,
        }}
      />
      <Stack.Screen
        name="ManageCurrency"
        component={ManageCurrencyScreen}
        options={{
          headerShown: true,
          headerTitle: "Currency",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};
