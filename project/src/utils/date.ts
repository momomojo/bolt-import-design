// Date utility functions

/**
 * Format a date to a readable string
 * @param date Date to format
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a time to a readable string
 * @param time Time string to format (e.g., "14:00")
 * @returns Formatted time string (e.g., "2:00 PM")
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Format a date and time to a readable string
 * @param date Date to format
 * @param time Time string to format (e.g., "14:00")
 * @returns Formatted date and time string (e.g., "Jan 1, 2023 at 2:00 PM")
 */
export const formatDateTime = (date: Date | string, time: string): string => {
  return `${formatDate(date)} at ${formatTime(time)}`;
};

/**
 * Get the day of the week for a date
 * @param date Date to get the day of the week for
 * @returns Day of the week (e.g., "Monday")
 */
export const getDayOfWeek = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns True if the date is in the past
 */
export const isDateInPast = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d < today;
};

/**
 * Get a date range for the next n days
 * @param days Number of days to include in the range
 * @returns Array of dates
 */
export const getDateRange = (days: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

/**
 * Get the relative time from now
 * @param date Date to get the relative time for
 * @returns Relative time string (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 0) {
    // In the past
    if (diffSec > -60) return `${Math.abs(diffSec)} seconds ago`;
    if (diffMin > -60) return `${Math.abs(diffMin)} minutes ago`;
    if (diffHour > -24) return `${Math.abs(diffHour)} hours ago`;
    if (diffDay > -30) return `${Math.abs(diffDay)} days ago`;
    return formatDate(d);
  } else {
    // In the future
    if (diffSec < 60) return `in ${diffSec} seconds`;
    if (diffMin < 60) return `in ${diffMin} minutes`;
    if (diffHour < 24) return `in ${diffHour} hours`;
    if (diffDay < 30) return `in ${diffDay} days`;
    return formatDate(d);
  }
};
