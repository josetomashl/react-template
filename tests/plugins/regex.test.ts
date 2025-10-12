import { describe, expect, it } from 'vitest';

import { REGEX } from '@/plugins/data/regex';

describe('REGEX', () => {
  describe('email', () => {
    it('matches valid emails', () => {
      expect(REGEX.email.test('test@example.com')).toBe(true);
      expect(REGEX.email.test('user.name+tag@domain.co')).toBe(true);
    });
    it('does not match invalid emails', () => {
      expect(REGEX.email.test('testexample.com')).toBe(false);
      expect(REGEX.email.test('test@.com')).toBe(false);
      expect(REGEX.email.test('test@com')).toBe(false);
      expect(REGEX.email.test('test@com.')).toBe(false);
    });
  });

  describe('password', () => {
    it('matches valid passwords', () => {
      expect(REGEX.password.test('Password1')).toBe(true);
      expect(REGEX.password.test('Abcdefg1')).toBe(true);
    });
    it('does not match invalid passwords', () => {
      expect(REGEX.password.test('password')).toBe(false); // no uppercase, no digit
      expect(REGEX.password.test('PASSWORD')).toBe(false); // no lowercase, no digit
      expect(REGEX.password.test('Password')).toBe(false); // no digit
      expect(REGEX.password.test('Pass1')).toBe(false); // too short
    });
  });

  describe('phone', () => {
    it('matches valid phone numbers', () => {
      expect(REGEX.phone.test('+34 123456789')).toBe(true);
      expect(REGEX.phone.test('+34123456789')).toBe(true);
      expect(REGEX.phone.test('+12345 67890 12345')).toBe(true);
      expect(REGEX.phone.test('123456789')).toBe(true);
      expect(REGEX.phone.test('123 45 67 89')).toBe(true);
    });
    it('does not match invalid phone numbers', () => {
      expect(REGEX.phone.test('+123')).toBe(false); // too short
      expect(REGEX.phone.test('+12 34 562 901 234 562')).toBe(false); // too long
      expect(REGEX.phone.test('+12345abcde')).toBe(false); // with letters
      expect(REGEX.phone.test('abcde')).toBe(false); // only letters
    });
  });

  describe('url', () => {
    it('matches valid urls', () => {
      expect(REGEX.url.test('http://example.com')).toBe(true);
      expect(REGEX.url.test('https://example.com/path')).toBe(true);
      expect(REGEX.url.test('ftp://example.com')).toBe(true);
      expect(REGEX.url.test('http://example.co.uk')).toBe(true);
      expect(REGEX.url.test('')).toBe(true); // optional
    });
    it('does not match invalid urls', () => {
      expect(REGEX.url.test('example')).toBe(false);
      expect(REGEX.url.test('http:/example.com')).toBe(false);
      expect(REGEX.url.test('http://')).toBe(false);
    });
  });

  describe('currency', () => {
    it('matches valid currency formats', () => {
      expect(REGEX.currency.test('123')).toBe(true);
      expect(REGEX.currency.test('-123')).toBe(true);
      expect(REGEX.currency.test('123.45')).toBe(true);
      expect(REGEX.currency.test('123,45')).toBe(true);
      expect(REGEX.currency.test('123/45')).toBe(true);
      expect(REGEX.currency.test('-123.45')).toBe(true);
      expect(REGEX.currency.test('.45')).toBe(true);
      expect(REGEX.currency.test('0.99')).toBe(true);
    });
    it('does not match invalid currency formats', () => {
      expect(REGEX.currency.test('123.456')).toBe(false); // too many decimals
      expect(REGEX.currency.test('123,456')).toBe(false); // too many decimals
      expect(REGEX.currency.test('abc')).toBe(false);
      expect(REGEX.currency.test('--123')).toBe(false);
      expect(REGEX.currency.test('123..45')).toBe(false);
    });
  });
});
