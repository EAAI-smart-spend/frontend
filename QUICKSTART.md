# SmartSpend - Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites Check
Make sure you have:
- ✅ Node.js installed (`node --version`)
- ✅ npm or yarn installed
- ✅ Expo CLI installed (`expo --version` or install with `npm install -g expo-cli`)

### 2. Install & Run
```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

### 3. Open the App

#### Option A: iOS Simulator (Mac only)
```bash
# Press 'i' in the Expo terminal
# Or run:
npm run ios
```

#### Option B: Android Emulator
```bash
# Press 'a' in the Expo terminal
# Or run:
npm run android
```

#### Option C: Physical Device
1. Install "Expo Go" app from App Store/Play Store
2. Scan the QR code in the terminal
3. App will load on your device

#### Option D: Web Browser
```bash
# Press 'w' in the Expo terminal
# Or run:
npm run web
```

## 📱 App Overview

### User Flow
```
Launch → Onboarding → Bottom Tab Navigation
                      ├─ Home (Summary)
                      ├─ Expenses (List)
                      ├─ Add Expense (Form)
                      ├─ Dashboard (Charts)
                      └─ Settings
```

### Key Features to Test

1. **Onboarding Screen**
   - Welcome message
   - "Get Started" button to enter app

2. **Home Screen**
   - View today's spending summary
   - View weekly spending summary
   - Tap FAB (+) button to add expense

3. **Add Expense**
   - Enter expense name
   - Enter amount
   - Select category (Food, Transport, Shopping, etc.)
   - Pick date
   - Save expense

4. **Expenses Screen**
   - View all expenses in list
   - Swipe left to delete
   - See category colors and icons

5. **Dashboard Screen**
   - Pie chart showing spending by category
   - Bar chart showing weekly trends
   - Total spending summary

6. **Settings Screen**
   - Manage categories
   - Export data options
   - App preferences

## 🎨 Design Highlights

- **iOS-Style UI**: Clean, native-feeling interface
- **React Native Paper**: Material components styled for iOS
- **Smooth Animations**: Native-like transitions
- **Swipe Gestures**: Intuitive expense deletion
- **FAB Buttons**: Quick actions on key screens
- **Color-Coded Categories**: Visual organization

## 🔧 Development Commands

```bash
# Start development server
npm start

# Start with cleared cache
npm start -- --clear

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# TypeScript check
npx tsc --noEmit

# Lint code
npm run lint
```

## 🐛 Common Issues & Fixes

### Issue: "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

### Issue: "Metro bundler stuck"
```bash
# Kill Metro and restart
killall node
npm start -- --clear
```

### Issue: iOS Simulator not opening
- Make sure Xcode is installed
- Open Xcode → Preferences → Locations → Command Line Tools is set
- Try opening simulator manually first

### Issue: Android Emulator not found
- Open Android Studio
- Tools → AVD Manager → Create Virtual Device
- Start the emulator before running `npm run android`

## 📚 Project Structure Quick Reference

```
Key Files:
├── App.tsx                    # Main app entry (Provider setup)
├── navigation/
│   ├── RootNavigator.tsx      # Stack navigation
│   └── TabNavigator.tsx       # Bottom tabs
├── screens/
│   ├── OnboardingScreen.tsx   # First screen
│   ├── HomeScreen.tsx         # Main dashboard
│   ├── ExpensesScreen.tsx     # Expense list
│   ├── AddExpenseScreen.tsx   # Add/edit form
│   ├── DashboardScreen.tsx    # Charts
│   └── SettingsScreen.tsx     # Settings
├── store/
│   ├── store.ts               # Redux store
│   └── expensesSlice.ts       # Expense state
└── constants/
    └── theme.tsx              # iOS-style theme
```

## 🎯 Testing Checklist

- [ ] App launches without errors
- [ ] Onboarding screen shows and navigates to home
- [ ] Can add a new expense
- [ ] Expense appears in list
- [ ] Can swipe to delete expense
- [ ] Charts display correctly on dashboard
- [ ] Navigation between tabs works
- [ ] Form validation works (try empty fields)
- [ ] Date picker works
- [ ] Category dropdown works

## 💡 Tips

1. **Hot Reload**: Save files to see changes instantly
2. **Shake Device**: Opens developer menu on physical device
3. **Cmd+D** (iOS) or **Cmd+M** (Android): Opens dev menu in simulator
4. **Redux DevTools**: Use browser extension for state debugging
5. **Console Logs**: Check terminal and in-app console for debugging

## 🔄 Next Steps

1. Add more sample expenses to test
2. Try different categories
3. View analytics in dashboard
4. Customize categories in settings
5. Test swipe gestures
6. Try on different devices/screen sizes

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review Expo docs: https://docs.expo.dev/
- React Native Paper: https://callstack.github.io/react-native-paper/

---

**Enjoy building with SmartSpend! 🎉**
