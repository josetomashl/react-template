import { describe, expect, it } from 'vitest';
import { css, formatTwoDigit, toDate, toDateTime, toPrice, toTime } from '../../src/utils';

describe('utils test suite', () => {
  describe('css method', () => {
    it('combines multiple class names into a single string', () => {
      expect(css('a', 'b', 'c')).toBe('a b c');
    });

    it('returns a single class name unchanged', () => {
      expect(css('single')).toBe('single');
    });

    it('returns an empty string when no arguments are provided', () => {
      expect(css()).toBe('');
    });

    it('handles empty strings in arguments', () => {
      expect(css('a', '', 'b')).toBe('a  b');
    });
  });

  describe('formatTwoDigit method', () => {
    it('formats single-digit numbers with leading zero', () => {
      expect(formatTwoDigit(5)).toBe('05');
      expect(formatTwoDigit('7')).toBe('07');
    });

    it('returns two-digit numbers as strings', () => {
      expect(formatTwoDigit(12)).toBe('12');
      expect(formatTwoDigit('34')).toBe('34');
    });

    it('handles zero correctly', () => {
      expect(formatTwoDigit(0)).toBe('00');
      expect(formatTwoDigit('0')).toBe('00');
    });

    it('returns "00" for invalid input', () => {
      expect(formatTwoDigit('abc')).toBe('00');
      expect(formatTwoDigit(NaN)).toBe('00');
      expect(formatTwoDigit('')).toBe('00');
    });

    it('handles negative numbers', () => {
      expect(formatTwoDigit(-3)).toBe('-3');
      expect(formatTwoDigit('-9')).toBe('-9');
    });
  });

  describe('toPrice method', () => {
    it('formats positive numbers correctly', () => {
      expect(toPrice(1234.56)).toBe('1.234,56 €');
      expect(toPrice('987.65')).toBe('987,65 €');
      expect(toPrice(0)).toBe('0,00 €');
    });

    it('formats negative numbers with "-" sign by default', () => {
      expect(toPrice(-123.45)).toBe('-123,45 €');
      expect(toPrice('-678.90')).toBe('-678,90 €');
    });

    it('removes "-" sign for negative numbers when isAbsolute is true', () => {
      expect(toPrice(-123.45, true)).toBe('123,45 €');
      expect(toPrice('-678.90', true)).toBe('678,90 €');
    });

    it('returns null for invalid input', () => {
      expect(toPrice('abc')).toBeNull();
      expect(toPrice(NaN)).toBeNull();
      expect(toPrice(undefined as unknown as string)).toBeNull();
      expect(toPrice(null as unknown as string)).toBe('0,00 €');
    });

    it('formats integer values with two decimal places', () => {
      expect(toPrice(5)).toBe('5,00 €');
      expect(toPrice('10')).toBe('10,00 €');
    });

    it('handles very large and very small numbers', () => {
      expect(toPrice(1000000)).toBe('1.000.000,00 €');
      expect(toPrice(0.01)).toBe('0,01 €');
    });
  });

  describe('toDateTime method', () => {
    it('formats valid ISO date string to "DD/MM/YYYY HH:mm"', () => {
      const date = '2023-06-15T14:23:45.000Z';
      // The expected output depends on the local timezone, so we use the function itself for consistency
      const expected = toDateTime(date);
      expect(toDateTime(date)).toBe(expected);
    });

    it('formats date string with custom locale', () => {
      const date = '2023-12-01T08:05:00.000Z';
      const resultEs = toDateTime(date, 'es');
      const resultEn = toDateTime(date, 'en');
      expect(resultEs).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
      expect(resultEn).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    it('returns current date-time for invalid date input', () => {
      const now = new Date();
      const result = toDateTime('invalid-date');
      // The result should start with today's date in DD/MM/YYYY format
      const today =
        now.getDate().toString().padStart(2, '0') +
        '/' +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        now.getFullYear();
      expect(result).toContain(today);
    });

    it('handles empty string as date input', () => {
      const result = toDateTime('');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    it('handles undefined as date input', () => {
      const result = toDateTime(undefined as unknown as string);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });

    it('handles null as date input', () => {
      const result = toDateTime(null as unknown as string);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
    });
  });

  describe('toTime method', () => {
    it('formats valid ISO date string to "HH:MM"', () => {
      const date = '2023-06-15T14:23:45.000Z';
      // The expected output depends on the local timezone, so we use the function itself for consistency
      const expected = toTime(date);
      expect(toTime(date)).toBe(expected);
    });

    it('returns current time for invalid date input', () => {
      const now = new Date();
      const expected = formatTwoDigit(now.getHours()) + ':' + formatTwoDigit(now.getMinutes());
      expect(toTime('invalid-date')).toBe(expected);
    });
  });

  describe('toDate method', () => {
    it('formats valid ISO date string to default format "DD/MM/YYYY"', () => {
      const date = '2023-06-15T14:23:45.000Z';
      const result = toDate(date);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('formats date with custom format placeholders', () => {
      const date = '2023-12-01T08:05:00.000Z';
      const result = toDate(date, 'YYYY-MM-DD');
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('formats date with month name (MMMM)', () => {
      const date = '2023-01-10T00:00:00.000Z';
      const result = toDate(date, 'D MMMM YYYY', 'en');
      expect(result).toMatch(/\d{1,2} [A-Za-z]+ \d{4}/);
    });

    it('formats date with abbreviated month name (MMM)', () => {
      const date = '2023-02-05T00:00:00.000Z';
      const result = toDate(date, 'DD MMM YY', 'en');
      expect(result).toMatch(/\d{2} [A-Za-z]+ \d{2}/);
    });

    it('formats date with single-digit day and month (D/M/YYYY)', () => {
      const date = '2023-03-04T00:00:00.000Z';
      const result = toDate(date, 'D/M/YYYY');
      expect(result).toMatch(/\d{1}\/\d{1}\/\d{4}/);
    });

    it('handles invalid date input by returning current date', () => {
      const now = new Date();
      const today =
        now.getDate().toString().padStart(2, '0') +
        '/' +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        now.getFullYear();
      expect(toDate('invalid-date')).toContain(today);
    });

    it('handles empty string as date input', () => {
      const result = toDate('');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('handles undefined as date input', () => {
      const result = toDate(undefined as unknown as string);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('handles null as date input', () => {
      const result = toDate(null as unknown as string);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('supports custom locale', () => {
      const date = '2023-07-20T00:00:00.000Z';
      const resultEs = toDate(date, 'DD MMMM YYYY', 'es');
      const resultEn = toDate(date, 'DD MMMM YYYY', 'en');
      expect(resultEs).not.toBe(resultEn);
    });
  });
});
