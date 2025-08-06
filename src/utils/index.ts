/**
 * Combines multiple class names into a single string.
 *
 * @param classes - A list of CSS class names to combine.
 * @returns A single string with all class names separated by a space.
 */
export function css(...classes: string[]) {
  return classes.join(' ');
}
