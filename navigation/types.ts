import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import type { Expense } from '../store/expensesSlice';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Expenses: undefined;
  AddExpense: { expense?: Expense } | undefined;
  Dashboard: undefined;
  Settings: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>;

export type AddExpenseRouteProp = RouteProp<MainTabParamList, 'AddExpense'>;
