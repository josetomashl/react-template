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
 * Checks if a given string can be parsed into a valid date.
 *
 * @param str - The string to check.
 * @returns `true` if the string represents a valid date, otherwise `false`.
 */
export function isDate(str?: string): boolean {
  if (!str || typeof str !== 'string' || str.trim() === '') {
    return false;
  }
  const date = new Date(str);
  return !isNaN(date.getTime());
}
