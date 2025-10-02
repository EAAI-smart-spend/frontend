# SmartSpend - Expense Tracking App

A beautiful iOS-style expense tracking application built with Expo, React Native, React Native Paper, and Redux Toolkit.

## � Features

- **Onboarding Flow**: Welcome screen with smooth introduction
- **Expense Management**: Add, view, edit, and delete expenses with swipe gestures
- **Dashboard Analytics**: Visualize spending with pie charts and bar graphs
- **Category Tracking**: Organize expenses by customizable categories
- **Smart Summaries**: View today's and weekly spending at a glance
- **Settings & Export**: Manage preferences and export data
- **iOS-Style UI**: Clean, native-feeling interface using React Native Paper

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-spend-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   expo start
   ```

### Running on iOS

```bash
npm run ios
# or
yarn ios
# or press 'i' in the Expo terminal
```

### Running on Android

```bash
npm run android
# or
yarn android
# or press 'a' in the Expo terminal
```

### Running on Web

```bash
npm run web
# or
yarn web
```

## 📁 Project Structure

```
smart-spend-frontend/
├── app/                      # Expo Router files (legacy)
├── assets/                   # Images, icons, and static resources
├── components/               # Reusable UI components
│   ├── ChartView.tsx        # Chart rendering component
│   ├── ExpenseCard.tsx      # Individual expense display card
│   ├── FormInput.tsx        # Styled form input component
│   ├── SummaryCard.tsx      # Summary statistics card
│   └── ui/                  # Base UI components
├── constants/                # App-wide constants
│   └── theme.tsx            # React Native Paper theme config
├── hooks/                    # Custom React hooks
├── navigation/               # Navigation configuration
│   ├── RootNavigator.tsx    # Main stack navigator
│   ├── TabNavigator.tsx     # Bottom tab navigator
│   ├── types.ts             # Navigation type definitions
│   └── index.ts             # Navigation exports
├── screens/                  # App screens/pages
│   ├── OnboardingScreen.tsx # Welcome/intro screen
│   ├── HomeScreen.tsx       # Main dashboard with summaries
│   ├── ExpensesScreen.tsx   # Full expense list
│   ├── AddExpenseScreen.tsx # Add/edit expense form
│   ├── DashboardScreen.tsx  # Analytics and charts
│   ├── SettingsScreen.tsx   # App settings
│   └── index.ts             # Screen exports
├── store/                    # Redux state management
│   ├── store.ts             # Redux store configuration
│   ├── expensesSlice.ts     # Expenses state slice
│   └── hooks.ts             # Typed Redux hooks
├── utils/                    # Utility functions
│   ├── formatCurrency.ts    # Currency formatting
│   ├── formatDate.ts        # Date formatting
│   ├── validation.ts        # Form validation
│   └── index.ts             # Utility exports
├── App.tsx                   # Main app entry point
├── app.json                  # Expo configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Key Technologies

- **Expo**: Development framework for React Native
- **React Native**: Cross-platform mobile framework
- **React Native Paper**: Material Design components with iOS styling
- **Redux Toolkit**: State management
- **React Navigation**: Navigation library (Stack + Bottom Tabs)
- **React Native Chart Kit**: Data visualization
- **TypeScript**: Type safety
- **Expo Vector Icons**: Icon library

## 🧭 Navigation Flow

```
App Launch
    ↓
Onboarding Screen (first time)
    ↓
Main App (Bottom Tabs)
    ├─ Home (Overview + Quick Add)
    ├─ Expenses (Full List + Swipe to Delete)
    ├─ Add Expense (Form)
    ├─ Dashboard (Charts & Analytics)
    └─ Settings (Preferences & Export)
```

## 💾 State Management

The app uses Redux Toolkit for state management with the following structure:

- **Expenses Slice**: Manages all expense-related state
  - `expenses`: Array of all expenses
  - `categories`: Available expense categories
  - Actions: `addExpense`, `updateExpense`, `deleteExpense`

## 🎯 Key Features Breakdown

### Home Screen
- Summary cards showing today's and weekly spending
- Quick access to add expenses via FAB
- Recent transactions preview

### Expenses Screen
- Full list of all expenses
- Swipe-to-delete functionality
- Category filtering
- Sort by date or amount

### Add Expense Screen
- Name/description input
- Amount input (with currency formatting)
- Category selection dropdown
- Date picker
- Form validation

### Dashboard Screen
- Pie chart: Spending by category
- Bar chart: Weekly spending trends
- Total spending summaries
- Category breakdowns

### Settings Screen
- Currency selection
- Category management
- Dark mode toggle (future)
- Export data (CSV/JSON)
- App information

## 🎨 iOS-Style Design

The app uses React Native Paper with custom iOS-style theming:

- **Colors**: iOS system colors (blue, red, green, etc.)
- **Typography**: System font family
- **Components**: Rounded corners, subtle shadows
- **Interactions**: Native-feeling animations and gestures
- **Layout**: SafeAreaView for notch/home indicator spacing

## 📝 Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm test           # Run tests (if configured)
```

## 🐛 Troubleshooting

### iOS Simulator Issues
- Make sure Xcode is installed and up to date
- Run `expo doctor` to check for issues
- Try clearing cache: `expo start -c`

### Module Resolution Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Metro bundler cache: `expo start -c`

### Redux DevTools
- Install Redux DevTools Extension in your browser
- Enable it in development for state debugging

## 🔮 Future Enhancements

- [ ] Recurring expenses
- [ ] Budget limits and alerts
- [ ] Multi-currency support
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Biometric authentication
- [ ] Receipt photo attachments
- [ ] Advanced filtering and search
- [ ] Export to PDF reports
- [ ] Dark mode
- [ ] Widgets (iOS/Android)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Development

Built with ❤️ using Expo and React Native

---

For more information, visit the [Expo Documentation](https://docs.expo.dev/) or [React Native Paper Documentation](https://callstack.github.io/react-native-paper/).