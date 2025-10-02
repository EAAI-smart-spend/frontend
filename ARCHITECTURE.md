# SmartSpend Architecture Documentation

## 🏗️ Application Architecture

SmartSpend follows a modern React Native architecture with clear separation of concerns and unidirectional data flow.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     App.tsx (Root)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Redux Provider (State)                  │   │
│  │  ┌──────────────────────────────────────────┐  │   │
│  │  │     React Native Paper Provider          │  │   │
│  │  │  ┌───────────────────────────────────┐  │  │   │
│  │  │  │   Safe Area Provider              │  │  │   │
│  │  │  │  ┌────────────────────────────┐  │  │  │   │
│  │  │  │  │  Navigation Container      │  │  │  │   │
│  │  │  │  │  ┌──────────────────────┐ │  │  │  │   │
│  │  │  │  │  │  Root Navigator      │ │  │  │  │   │
│  │  │  │  │  │  (Stack)             │ │  │  │  │   │
│  │  │  │  │  │  • Onboarding        │ │  │  │  │   │
│  │  │  │  │  │  • Main (Tabs)       │ │  │  │  │   │
│  │  │  │  │  └──────────────────────┘ │  │  │  │   │
│  │  │  │  └────────────────────────────┘  │  │  │   │
│  │  │  └───────────────────────────────────┘  │  │   │
│  │  └──────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
User Action → Screen Component → Redux Action → Redux Reducer
                                                      ↓
User Interface ← Screen Component ← useSelector ← Store State
```

### Example: Adding an Expense

1. User fills form in `AddExpenseScreen`
2. User taps "Save" button
3. `handleSubmit` validates input
4. Dispatches `addExpense` action
5. Redux reducer updates store
6. All subscribed components re-render
7. User sees new expense in list

## 📁 Project Structure & Responsibilities

### `/app` - Expo Router (Legacy)
- **Purpose**: Original Expo Router files (not actively used)
- **Status**: Kept for reference, replaced by custom navigation

### `/assets` - Static Resources
- **Purpose**: Images, icons, fonts
- **Contents**: 
  - App icons (various sizes)
  - Splash screens
  - Image assets

### `/components` - Reusable UI Components
- **Purpose**: Shared, reusable React components
- **Key Files**:
  - `ExpenseCard.tsx`: Individual expense item display
  - `FormInput.tsx`: Styled text input with validation
  - `SummaryCard.tsx`: Dashboard summary display
  - `ChartView.tsx`: Wrapper for chart rendering
  - `/ui`: Base UI components (collapsible, icons)

**Principle**: Components are pure and presentational

### `/constants` - App-Wide Constants
- **Purpose**: Centralized configuration
- **Key Files**:
  - `theme.tsx`: React Native Paper theme (iOS-style)
  
**Contents**:
- Colors (iOS system colors)
- Font configurations
- Spacing/sizing constants
- Roundness/elevation values

### `/hooks` - Custom React Hooks
- **Purpose**: Reusable stateful logic
- **Key Files**:
  - `use-color-scheme.ts`: Theme detection
  - `use-theme-color.ts`: Dynamic color resolution

### `/navigation` - Navigation Configuration
- **Purpose**: App routing and navigation structure
- **Key Files**:
  - `RootNavigator.tsx`: Top-level stack navigator
  - `TabNavigator.tsx`: Bottom tab navigation
  - `types.ts`: TypeScript navigation types
  
**Navigation Hierarchy**:
```
Root Stack Navigator
├─ Onboarding (Screen)
└─ MainTabs (Tab Navigator)
   ├─ Home (Screen)
   ├─ Expenses (Screen)
   ├─ AddExpense (Screen)
   ├─ Dashboard (Screen)
   └─ Settings (Screen)
```

### `/screens` - Application Screens
- **Purpose**: Full-page components connected to Redux
- **Key Files**:
  - `OnboardingScreen.tsx`: Welcome/intro screen
  - `HomeScreen.tsx`: Main dashboard with summaries
  - `ExpensesScreen.tsx`: Full expense list with swipe actions
  - `AddExpenseScreen.tsx`: Form for creating/editing expenses
  - `DashboardScreen.tsx`: Charts and analytics
  - `SettingsScreen.tsx`: App configuration

**Screen Responsibilities**:
- Connect to Redux store (useSelector/useDispatch)
- Handle user interactions
- Manage local UI state
- Navigate between screens
- Compose components into layouts

### `/store` - Redux State Management
- **Purpose**: Centralized application state
- **Key Files**:
  - `store.ts`: Redux store configuration
  - `expensesSlice.ts`: Expense state and reducers
  - `hooks.ts`: Typed Redux hooks (useAppDispatch, useAppSelector)

**State Structure**:
```typescript
{
  expenses: {
    expenses: Expense[],
    categories: Category[]
  }
}
```

**Actions**:
- `addExpense`: Add new expense
- `updateExpense`: Update existing expense
- `deleteExpense`: Remove expense
- (Future: `addCategory`, `updateCategory`, etc.)

### `/utils` - Utility Functions
- **Purpose**: Pure helper functions
- **Key Files**:
  - `formatCurrency.ts`: Format numbers as currency
  - `formatDate.ts`: Format dates for display
  - `validation.ts`: Input validation logic

**Principle**: All utils are pure functions (no side effects)

## 🔄 State Management Details

### Redux Store Configuration

```typescript
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
```

### Expense Slice Structure

```typescript
interface ExpensesState {
  expenses: Expense[];
  categories: Category[];
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}
```

### Connecting Components to Redux

```typescript
// Reading state
const expenses = useAppSelector((state) => state.expenses.expenses);

// Dispatching actions
const dispatch = useAppDispatch();
dispatch(addExpense(newExpense));
```

## 🎨 UI/Theme Architecture

### Theme Configuration
- Based on React Native Paper's MD3 theme
- Customized with iOS system colors
- Consistent spacing and typography

### Color System
```typescript
primary: '#007AFF'    // iOS Blue
secondary: '#5856D6'  // iOS Purple
error: '#FF3B30'      // iOS Red
success: '#34C759'    // iOS Green
warning: '#FF9500'    // iOS Orange
background: '#F2F2F7' // iOS Light Gray
```

### Typography
- System font family (San Francisco on iOS)
- Three weights: regular (400), medium (500), bold (700)
- Consistent sizing hierarchy

## 🔌 Navigation Architecture

### Stack Navigator (Root)
- Handles authentication flow
- Manages onboarding state
- Contains main tab navigator

### Tab Navigator (Main)
- Bottom navigation with 5 tabs
- iOS-style icons (Ionicons)
- Badge support for notifications
- Active state highlighting

### Navigation Flow
```
App Launch
    ↓
Check Onboarding Status
    ↓
┌───────────────┐
│ First Time?   │
└───────┬───────┘
        │
    ┌───┴───┐
    │  Yes  │──→ Onboarding Screen
    └───┬───┘           ↓
        │           "Get Started"
    ┌───┴───┐           ↓
    │   No  │──→ Main Tab Navigation
    └───────┘
```

## 📱 Component Hierarchy

### Screen Component Pattern
```typescript
export default function HomeScreen({ navigation }: Props) {
  // 1. Redux state
  const expenses = useAppSelector(selectExpenses);
  const dispatch = useAppDispatch();
  
  // 2. Local state
  const [loading, setLoading] = useState(false);
  
  // 3. Derived state
  const todayTotal = useMemo(() => calculateToday(expenses), [expenses]);
  
  // 4. Handlers
  const handleAddExpense = () => {
    navigation.navigate('AddExpense');
  };
  
  // 5. Render
  return (
    <SafeAreaView>
      {/* Component tree */}
    </SafeAreaView>
  );
}
```

## 🔐 Data Persistence (Future)

### Planned Architecture
```
Redux Store
    ↓
Redux Persist Middleware
    ↓
AsyncStorage (React Native)
    ↓
Device Storage
```

### Data Sync (Future)
```
Redux Store ←→ API Client ←→ Backend API
                   ↓
              Firebase/Supabase
                   ↓
              Cloud Database
```

## 🧪 Testing Strategy (Future)

### Unit Tests
- Utils functions
- Redux reducers
- Selectors

### Integration Tests
- Redux action flows
- Navigation flows

### E2E Tests
- Complete user journeys
- Critical paths

## 🚀 Build & Deployment

### Development
```
npm start → Metro Bundler → Development Build
```

### Production
```
npm run build → Expo Build Service → .ipa/.apk
```

## 📈 Performance Considerations

### Optimizations Applied
1. **Memoization**: useMemo for expensive calculations
2. **Callback Memoization**: useCallback for handlers
3. **List Virtualization**: FlatList for long expense lists
4. **Lazy Loading**: Code splitting (future)
5. **Image Optimization**: Proper sizing and formats

### Redux Best Practices
- Normalized state structure
- Selector memoization
- Action batching for multiple updates

## 🔄 Future Enhancements

### Planned Features
1. **Offline First**: Redux Persist + AsyncStorage
2. **Cloud Sync**: Firebase/Supabase integration
3. **Auth**: User accounts and multi-device sync
4. **Notifications**: Expense reminders
5. **Widgets**: iOS/Android home screen widgets
6. **Sharing**: Export and share reports

### Architecture Changes
- Add authentication layer
- Implement API service layer
- Add offline queue for sync
- Introduce feature flags

## 📚 Dependencies Overview

### Core
- `expo`: Development platform
- `react-native`: Mobile framework
- `react-native-paper`: UI components
- `@react-navigation/*`: Navigation
- `@reduxjs/toolkit`: State management
- `react-redux`: React-Redux bindings

### Utilities
- `react-native-chart-kit`: Charts
- `react-native-svg`: SVG support
- `date-fns`: Date manipulation
- TypeScript: Type safety

## 🎯 Design Principles

1. **Separation of Concerns**: Clear boundaries between layers
2. **Unidirectional Data Flow**: Redux pattern
3. **Component Composition**: Small, reusable components
4. **Type Safety**: TypeScript throughout
5. **iOS-First Design**: Native feeling on iOS
6. **Performance**: Optimized rendering and state updates
7. **Maintainability**: Clear structure and documentation

---

**Last Updated**: October 2, 2025
