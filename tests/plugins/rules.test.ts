import { describe, expect, it } from 'vitest';

import { RULES } from '@/plugins/rules';

// Mock REGEXP used in rules.ts
// vi.mock('@/plugins/regexps', () => ({
//   REGEXP: {
//     email: { test: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
//     password: { test: (v: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) },
//     phone: { test: (v: string) => /^\+?\d{9,15}$/.test(v) },
//     url: { test: (v: string) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(v) },
//     currency: { test: (v: string) => /^-?\d+(?:[.,]\d{1,2})?$/.test(v) }
//   }
// }));

describe('RULES', () => {
  describe('required', () => {
    it('returns true for non-empty values', () => {
      expect(RULES.required('a')).toBe(true);
      expect(RULES.required(1)).toBe(true);
      expect(RULES.required([])).toBe(true);
      expect(RULES.required({})).toBe(true);
    });
    it('returns true for 0', () => {
      expect(RULES.required(0)).toBe(true);
    });
    it('returns error message for empty values', () => {
      expect(RULES.required('')).toBe('Campo obligatorio.');
      expect(RULES.required(null)).toBe('Campo obligatorio.');
      expect(RULES.required(undefined)).toBe('Campo obligatorio.');
      expect(RULES.required(false)).toBe('Campo obligatorio.');
    });
  });

  describe('email', () => {
    it('returns true for valid emails', () => {
      expect(RULES.email('test@example.com')).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.email('')).toBe(true);
    });
    it('returns error for invalid emails', () => {
      expect(RULES.email('invalid-email')).toBe('Introduce un email válido.');
    });
  });

  describe('password', () => {
    it('returns true for valid passwords', () => {
      expect(RULES.password('Password1')).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.password('')).toBe(true);
    });
    it('returns error for invalid passwords', () => {
      expect(RULES.password('short')).toBe('Introduce una contraseña válida.');
      expect(RULES.password('password')).toBe('Introduce una contraseña válida.');
    });
  });

  describe('phone', () => {
    it('returns true for valid phone numbers', () => {
      expect(RULES.phone('+34123456789')).toBe(true);
      expect(RULES.phone('+34 123456789')).toBe(true);
      expect(RULES.phone('123456789')).toBe(true);
      expect(RULES.phone('123 45 67 89')).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.phone('')).toBe(true);
    });
    it('returns error for invalid phone numbers', () => {
      expect(RULES.phone('abc')).toBe('Introduce un teléfono válido.');
    });
  });

  describe('url', () => {
    it('returns true for valid urls', () => {
      expect(RULES.url('http://example.com')).toBe(true);
      expect(RULES.url('https://example.com')).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.url('')).toBe(true);
    });
    it('returns error for invalid urls', () => {
      expect(RULES.url('notaurl')).toBe('Introduce una url válida.');
    });
  });

  describe('currency', () => {
    it('returns true for valid currency formats', () => {
      expect(RULES.currency('1234.56')).toBe(true);
      expect(RULES.currency('1234,56')).toBe(true);
      expect(RULES.currency('-1234.56')).toBe(true);
      expect(RULES.currency('1234')).toBe(true);
    });
    it('returns error for invalid currency', () => {
      expect(RULES.currency('abc')).toBe('Introduce un importe válido como 1234.56, 1234,56 ó -1234.56.');
    });
  });

  describe('match', () => {
    it('returns true if values match', () => {
      expect(RULES.match('abc', 'abc')).toBe(true);
    });
    it('returns error if values do not match', () => {
      expect(RULES.match('abc', 'def')).toBe('Las campos no coinciden.');
      expect(RULES.match('abc', 'def', 'Contraseña')).toBe('Debe coincidir con el campo "Contraseña".');
    });
  });

  describe('maxLength', () => {
    it('returns true if value is shorter or equal to max', () => {
      expect(RULES.maxLength('abc', 3)).toBe(true);
      expect(RULES.maxLength('ab', 3)).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.maxLength('', 3)).toBe(true);
    });
    it('returns error if value is longer', () => {
      expect(RULES.maxLength('abcd', 3)).toBe('Máximo 3 caracteres.');
    });
  });

  describe('minLength', () => {
    it('returns true if value is longer or equal to min', () => {
      expect(RULES.minLength('abc', 3)).toBe(true);
      expect(RULES.minLength('abcd', 3)).toBe(true);
    });
    it('returns true for empty value', () => {
      expect(RULES.minLength('', 3)).toBe(true);
    });
    it('returns error if value is shorter', () => {
      expect(RULES.minLength('ab', 3)).toBe('Mínimo 3 caracteres.');
    });
  });

  describe('max', () => {
    it('returns true if value is less than or equal to max', () => {
      expect(RULES.max(2, 3)).toBe(true);
      expect(RULES.max(3, 3)).toBe(true);
    });
    it('returns true for falsy value', () => {
      expect(RULES.max(0, 3)).toBe(true);
      expect(RULES.max(null, 3)).toBe(true);
    });
    it('returns error if value is greater', () => {
      expect(RULES.max(4, 3)).toBe('Debe ser menor o igual a 3');
    });
  });

  describe('min', () => {
    it('returns true if value is greater than or equal to min', () => {
      expect(RULES.min(3, 2)).toBe(true);
      expect(RULES.min(3, 3)).toBe(true);
    });
    it('returns true for falsy value', () => {
      expect(RULES.min(0, 3)).toBe(true);
      expect(RULES.min(null, 3)).toBe(true);
    });
    it('returns error if value is less', () => {
      expect(RULES.min(1, 3)).toBe('Debe ser mayor o igual a 3');
    });
  });
});
