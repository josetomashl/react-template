import type { LocaleType } from '@/hooks/useTranslations';

/**
 * Combines multiple class names into a single string.
 *
 * @param classes - A list of CSS class names to combine.
 * @returns A single string with all class names separated by a space.
 */
export function css(...classes: string[]) {
  return classes.join(' ');
}

/**
 * Ensures a number or numeric string is formatted as a two-digit string.
 *
 * @param value - The input value, which can be a number or a numeric string.
 * @returns A string representation of the input, padded to two digits if necessary.
 */
export function formatTwoDigit(num: number | string): string {
  const numericValue = typeof num === 'string' ? parseInt(num, 10) : num;

  if (isNaN(numericValue)) {
    return '00';
  }

  return numericValue.toString().padStart(2, '0');
}

/**
 * Formats a number into a currency string in the 'es-ES' locale with EUR currency with 2 decimal places.
 *
 * @param str - The number or string to be formatted as a price.
 * @param isAbsolute - An optional flag indicating whether to display the value as an absolute number. If `true` removes the "-" sign (if present) for negative numbers. Defaults to `false`.
 * @returns A formatted currency string in the format of 'X,XXX.XX€'.
 */
export function toPrice(str: number | string, isAbsolute?: boolean): string | null {
  const numericValue = typeof str === 'string' ? parseFloat(str) : str;

  if (isNaN(numericValue)) {
    return null;
  }

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const formatted = formatter.format(numericValue).replace('-', isAbsolute ? '' : '-');

  return formatted.replace('€', '') + '€';
}

/**
 * Converts a date string into a formatted time string in the format 'DD/MM/YYYY' or provided one.
 *
 * @param date - The input date string.
 * @param format - The desired date format (default is 'DD/MM/YYYY'). Supported placeholders:
 *  - DD: Day of the month (2 digits)
 *  - DDD: Day of the week (e.g., Mon, Tue)
 *  - MM: Month of the year (2 digits)
 *  - MMM: Abbreviated month name (e.g., Jan, Feb)
 *  - YYYY: Full year (4 digits)
 *  - YYYY: Abbreviated year (2 last digits)
 * @param locale - The locale to format date string. Defaults to 'es'.
 * @returns A formatted date string or null if the input is invalid.
 */
export function toDate(date: string, format = 'DD/MM/YYYY', locale: LocaleType = 'es'): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const replacements: Record<string, string> = {
    DD: formatTwoDigit(parsedDate.getDate()),
    DDD: dayNames[parsedDate.getDay()],
    MM: formatTwoDigit(parsedDate.getMonth() + 1),
    MMM: monthNames[parsedDate.getMonth()],
    YY: parsedDate.getFullYear().toString().slice(-2),
    YYYY: parsedDate.getFullYear().toString()
  };

  const formattedDate = format.replace(/DD|DDD|MM|MMM|YY|YYYY/g, (match) => replacements[match]);

  return formattedDate;
}

/**
 * Converts a date string into a formatted time string in the format 'HH:MM'.
 *
 * @param date - The input date string.
 * @returns A formatted time string or null if the input is invalid.
 */
export function toTime(date: string): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const hours = formatTwoDigit(parsedDate.getHours());
  const minutes = formatTwoDigit(parsedDate.getMinutes());

  return `${hours}:${minutes}`;
}

/**
 * Converts a date string into a formatted date-time string in the format 'DD/MM/YYYY HH:mm:ss'.
 *
 * @param date - The input date string.
 * @param locale - The locale to format date string. Defaults to 'es'.
 * @returns A formatted date-time string or null if the input is invalid.
 */
export function toDateTime(date: string, locale: LocaleType = 'es'): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return null; // Invalid date
  }

  // Format date part using `toDate`
  const datePart = toDate(date, 'DD/MM/YYYY', locale);
  const timePart = toTime(date);

  return `${datePart} ${timePart}`;
}
