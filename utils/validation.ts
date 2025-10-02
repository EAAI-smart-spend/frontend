/**
 * Validation utilities for form inputs
 */

/**
 * Validate expense name
 */
export const validateExpenseName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'Expense name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Expense name must be at least 2 characters';
  }
  
  if (name.length > 100) {
    return 'Expense name must not exceed 100 characters';
  }
  
  return null;
};

/**
 * Validate expense amount
 */
export const validateAmount = (amount: string | number): string | null => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return 'Please enter a valid amount';
  }
  
  if (numAmount <= 0) {
    return 'Amount must be greater than 0';
  }
  
  if (numAmount > 1000000) {
    return 'Amount must not exceed 1,000,000';
  }
  
  return null;
};

/**
 * Validate category
 */
export const validateCategory = (category: string): string | null => {
  if (!category || category.trim().length === 0) {
    return 'Please select a category';
  }
  
  return null;
};

/**
 * Validate date
 */
export const validateDate = (date: string | Date): string | null => {
  if (!date) {
    return 'Date is required';
  }
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Please enter a valid date';
  }
  
  // Check if date is not in the future
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  if (d > today) {
    return 'Date cannot be in the future';
  }
  
  // Check if date is not too old (e.g., more than 10 years ago)
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  
  if (d < tenYearsAgo) {
    return 'Date cannot be more than 10 years ago';
  }
  
  return null;
};

/**
 * Validate category name for creating new category
 */
export const validateCategoryName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return 'Category name is required';
  }
  
  if (name.trim().length < 2) {
    return 'Category name must be at least 2 characters';
  }
  
  if (name.length > 50) {
    return 'Category name must not exceed 50 characters';
  }
  
  return null;
};

/**
 * Format validation errors for display
 */
export const formatValidationError = (error: string | null): string => {
  return error || '';
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: { [key: string]: string | null }): boolean => {
  return Object.values(errors).some((error) => error !== null);
};
