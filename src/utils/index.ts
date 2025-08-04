import type { LocaleType } from '@/contexts/translationContext';

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
    maximumFractionDigits: 2,
    useGrouping: true
  });

  const formatted = formatter.format(numericValue).replace('-', isAbsolute ? '' : '-');

  return formatted.replace('€', '').trim() + ' €';
}

/**
 * Formats a date string into a localized format with flexible placeholders.
 *
 * Supported placeholders:
 *  - D: Day of month (no leading zero)
 *  - DD: Day of month (2 digits)
 *  - M: Month number (no leading zero)
 *  - MM: Month number (2 digits)
 *  - MMM: Abbreviated month name (e.g., 'jan')
 *  - MMMM: Full month name (e.g., 'january')
 *  - YY: Last 2 digits of year
 *  - YYYY: Full year
 *
 * @param date - Input date string. If invalid, current date is used.
 * @param format - Format string using supported placeholders.
 * @param locale - BCP 47 locale string (e.g., 'es', 'en-US'). Defaults to 'es'.
 * @returns A formatted, localized date string.
 */
export function toDate(
  date: string = new Date().toISOString(),
  format: string = 'DD/MM/YYYY',
  locale: LocaleType = 'es'
): string {
  let parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date();
  }

  const day = parsedDate.getDate();
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  const formatWithIntl = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, options).format(parsedDate);

  const replacements: Record<string, string> = {
    D: day.toString(),
    DD: day.toString().padStart(2, '0'),
    M: (month + 1).toString(),
    MM: (month + 1).toString().padStart(2, '0'),
    MMM: formatWithIntl({ month: 'short' }),
    MMMM: formatWithIntl({ month: 'long' }),
    YY: year.toString().slice(-2),
    YYYY: year.toString()
  };

  return format.replace(/MMMM|MMM|MM|M|DD|D|YYYY|YY/g, (match) => replacements[match]);
}

/**
 * Formats a time string to 'HH:MM'.
 *
 * @param date - The input date string.
 * @returns A formatted time string or null if the input is invalid.
 */
export function toTime(date: string = new Date().toISOString()): string {
  let parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date();
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
export function toDateTime(date: string = new Date().toISOString(), locale: LocaleType = 'es'): string | null {
  let parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date();
  }

  // Format date part using `toDate`
  const datePart = toDate(date, 'DD/MM/YYYY', locale);
  const timePart = toTime(date);

  return `${datePart} ${timePart}`;
}
