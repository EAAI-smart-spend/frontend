import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Icon } from "react-native-paper";
import {
  AddExpenseScreen,
  DashboardScreen,
  ExpensesScreen,
  HomeScreen,
  SettingsScreen,
} from "../screens";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.5,
          borderTopColor: "#C6C6C8",
          height: 88,
          paddingBottom: 32,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <Icon source="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
