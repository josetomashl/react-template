import { describe, expect, it } from 'vitest';

import { css } from '@/utils';

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
});
