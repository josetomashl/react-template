import { describe, expect, it } from 'vitest';

import { css, isDate } from '@/utils';

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

    describe('isDate method', () => {
      it('returns true for valid ISO date string', () => {
        expect(isDate('2023-01-01')).toBe(true);
      });

      it('returns true for valid date-time string', () => {
        expect(isDate('2023-01-01T12:00:00Z')).toBe(true);
      });

      it('returns false for invalid date string', () => {
        expect(isDate('not-a-date')).toBe(false);
      });

      it('returns false for empty string', () => {
        expect(isDate('')).toBe(false);
      });

      it('returns false for undefined', () => {
        expect(isDate(undefined)).toBe(false);
      });

      it('returns false for string with only spaces', () => {
        expect(isDate('   ')).toBe(false);
      });

      it('returns true for valid date with slashes', () => {
        expect(isDate('12/31/2023')).toBe(true);
      });
    });
  });
});
