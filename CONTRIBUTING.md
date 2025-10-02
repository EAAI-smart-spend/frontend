# Contributing to SmartSpend

Thank you for your interest in contributing to SmartSpend! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-spend-frontend.git
   cd smart-spend-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Simulator/Device**
   ```bash
   npm run ios    # iOS
   npm run android # Android
   ```

## 📝 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
- Test on iOS simulator
- Test on Android emulator
- Verify no console errors
- Test all affected features

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add expense filtering feature"
```

**Commit Message Format**:
```
<type>: <description>

[optional body]
[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat: add expense search functionality"
git commit -m "fix: correct date formatting in expense card"
git commit -m "docs: update README with new screenshots"
git commit -m "refactor: simplify expense calculation logic"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🏗️ Code Style Guidelines

### TypeScript
```typescript
// ✅ Good
interface ExpenseProps {
  id: string;
  name: string;
  amount: number;
}

const ExpenseCard: React.FC<ExpenseProps> = ({ id, name, amount }) => {
  return <Card>{/* ... */}</Card>;
};

// ❌ Avoid
const ExpenseCard = (props: any) => {
  return <Card>{/* ... */}</Card>;
};
```

### Component Structure
```typescript
// Recommended component order:
export default function MyScreen({ navigation }: Props) {
  // 1. Redux hooks
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  
  // 2. State hooks
  const [loading, setLoading] = useState(false);
  
  // 3. Other hooks (useEffect, useMemo, etc.)
  useEffect(() => {
    // side effects
  }, []);
  
  const calculatedValue = useMemo(() => {
    // expensive calculation
  }, [dependencies]);
  
  // 4. Event handlers
  const handlePress = () => {
    // handler logic
  };
  
  // 5. Render functions
  const renderItem = (item: Item) => {
    return <ItemCard {...item} />;
  };
  
  // 6. Main render
  return (
    <View>
      {/* JSX */}
    </View>
  );
}
```

### Naming Conventions
```typescript
// Components: PascalCase
HomeScreen.tsx
ExpenseCard.tsx

// Functions: camelCase
const calculateTotal = () => { };
const handleSubmit = () => { };

// Constants: UPPER_SNAKE_CASE
const MAX_EXPENSES = 100;
const API_ENDPOINT = 'https://api.example.com';

// Files: kebab-case or PascalCase
format-currency.ts
ExpenseCard.tsx
```

### File Organization
```
/screens
  HomeScreen.tsx
  HomeScreen.styles.ts (if needed)
  HomeScreen.test.ts (if needed)
```

## 🎨 UI/UX Guidelines

### Design Principles
1. **iOS-First**: Design should feel native on iOS
2. **Consistency**: Use components from React Native Paper
3. **Accessibility**: Add proper labels and hints
4. **Responsiveness**: Test on different screen sizes

### Color Usage
```typescript
// ✅ Use theme colors
import { appTheme } from '../constants/theme';

<Text style={{ color: appTheme.colors.primary }}>

// ❌ Avoid hardcoded colors
<Text style={{ color: '#007AFF' }}>
```

### Spacing
```typescript
// Use consistent spacing units (multiples of 4 or 8)
const styles = StyleSheet.create({
  container: {
    padding: 16,      // ✅ 16 = 4 * 4
    margin: 8,        // ✅ 8 = 4 * 2
    gap: 12,          // ✅ 12 = 4 * 3
  },
});
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Feature works on iOS
- [ ] Feature works on Android
- [ ] No console errors or warnings
- [ ] Navigation works correctly
- [ ] Redux state updates properly
- [ ] Forms validate correctly
- [ ] Loading states display
- [ ] Error states handled

### Future: Automated Tests
```typescript
// Example unit test
import { formatCurrency } from '../utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });
});
```

## 📚 Documentation

### When to Update Docs
- Adding new features
- Changing project structure
- Updating dependencies
- Changing configuration

### Documentation Files
- `README.md`: Overview and setup
- `ARCHITECTURE.md`: Technical architecture
- `QUICKSTART.md`: Quick start guide
- `CONTRIBUTING.md`: This file
- Code comments: Complex logic

### Code Comments
```typescript
// ✅ Good comments (explain WHY)
// Calculate total using reduce to handle edge cases with undefined amounts
const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

// ❌ Unnecessary comments (explain WHAT - already obvious)
// Loop through expenses and add to total
const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
```

## 🐛 Bug Reports

### Before Submitting
1. Check if issue already exists
2. Verify it's reproducible
3. Test on latest version
4. Gather relevant information

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Device: [e.g. iPhone 14 Pro]
- OS: [e.g. iOS 16.0]
- App Version: [e.g. 1.0.0]
- Expo Version: [e.g. 49.0.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Mockups, screenshots, or examples.
```

## 🔍 Code Review Process

### What We Look For
- Code quality and readability
- TypeScript types are correct
- No console errors or warnings
- Follows project conventions
- Documentation updated
- Works on iOS and Android

### Review Timeline
- Initial review: 1-3 days
- Follow-up: 1-2 days
- Merge: After approval

## 🎯 Priority Areas

### High Priority
- Bug fixes
- Performance improvements
- Accessibility improvements
- Documentation improvements

### Medium Priority
- New features
- UI enhancements
- Code refactoring

### Future
- Internationalization
- Dark mode
- Advanced analytics
- Cloud sync

## 📦 Pull Request Guidelines

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] TypeScript types correct
- [ ] Redux state properly typed

### PR Title Format
```
feat: add expense search
fix: correct date picker crash
docs: update architecture guide
```

### PR Description Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes.

## Screenshots
If applicable.

## Related Issues
Fixes #123
```

## 🤝 Community

### Communication
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and ideas
- Pull Requests: Code contributions

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

## 📚 Resources

### Learning
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

## ❓ Questions?

If you have questions:
1. Check existing documentation
2. Search GitHub issues
3. Create a new discussion
4. Ask in pull request comments

---

Thank you for contributing to SmartSpend! 🎉
