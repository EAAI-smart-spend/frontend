/**
 * Format a date string or Date object to a readable format
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if date is today
  if (d.toDateString() === today.toDateString()) {
    return "Today";
  }

  // Check if date is yesterday
  if (d.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // Format as MMM DD, YYYY
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return d.toLocaleDateString("en-US", options);
};

/**
 * Format date to short format (MM/DD/YYYY)
 */
export const formatDateShort = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

/**
 * Get the start of day for a given date
 */
export const getStartOfDay = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get the start of week for a given date
 */
export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const startOfWeek = new Date(d.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

/**
 * Get the start of month for a given date
 */
export const getStartOfMonth = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Check if two dates are on the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};
