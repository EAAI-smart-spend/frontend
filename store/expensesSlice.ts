import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface ExpensesState {
  expenses: Expense[];
  categories: string[];
  currency: string;
}

const defaultCategories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other',
];

const initialState: ExpensesState = {
  expenses: [],
  categories: defaultCategories,
  currency: 'USD',
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      const newExpense: Expense = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      state.expenses.unshift(newExpense);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    categorizeExpense: (
      state,
      action: PayloadAction<{ id: string; category: string }>
    ) => {
      const expense = state.expenses.find(
        (expense) => expense.id === action.payload.id
      );
      if (expense) {
        expense.category = action.payload.category;
      }
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  categorizeExpense,
  addCategory,
  removeCategory,
  setCurrency,
} = expensesSlice.actions;

export default expensesSlice.reducer;
