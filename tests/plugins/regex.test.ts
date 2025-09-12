import { describe, expect, it } from 'vitest';

import { REGEXP } from '@/plugins/regex';

describe('REGEXP', () => {
  describe('email', () => {
    it('matches valid emails', () => {
      expect(REGEXP.email.test('test@example.com')).toBe(true);
      expect(REGEXP.email.test('user.name+tag@domain.co')).toBe(true);
    });
    it('does not match invalid emails', () => {
      expect(REGEXP.email.test('testexample.com')).toBe(false);
      expect(REGEXP.email.test('test@.com')).toBe(false);
      expect(REGEXP.email.test('test@com')).toBe(false);
      expect(REGEXP.email.test('test@com.')).toBe(false);
    });
  });

  describe('password', () => {
    it('matches valid passwords', () => {
      expect(REGEXP.password.test('Password1')).toBe(true);
      expect(REGEXP.password.test('Abcdefg1')).toBe(true);
    });
    it('does not match invalid passwords', () => {
      expect(REGEXP.password.test('password')).toBe(false); // no uppercase, no digit
      expect(REGEXP.password.test('PASSWORD')).toBe(false); // no lowercase, no digit
      expect(REGEXP.password.test('Password')).toBe(false); // no digit
      expect(REGEXP.password.test('Pass1')).toBe(false); // too short
    });
  });

  describe('phone', () => {
    it('matches valid phone numbers', () => {
      expect(REGEXP.phone.test('+34 123456789')).toBe(true);
      expect(REGEXP.phone.test('+34123456789')).toBe(true);
      expect(REGEXP.phone.test('+12345 67890 12345')).toBe(true);
      expect(REGEXP.phone.test('123456789')).toBe(true);
      expect(REGEXP.phone.test('123 45 67 89')).toBe(true);
    });
    it('does not match invalid phone numbers', () => {
      expect(REGEXP.phone.test('+123')).toBe(false); // too short
      expect(REGEXP.phone.test('+12 34 562 901 234 562')).toBe(false); // too long
      expect(REGEXP.phone.test('+12345abcde')).toBe(false); // with letters
      expect(REGEXP.phone.test('abcde')).toBe(false); // only letters
    });
  });

  describe('url', () => {
    it('matches valid urls', () => {
      expect(REGEXP.url.test('http://example.com')).toBe(true);
      expect(REGEXP.url.test('https://example.com/path')).toBe(true);
      expect(REGEXP.url.test('ftp://example.com')).toBe(true);
      expect(REGEXP.url.test('http://example.co.uk')).toBe(true);
      expect(REGEXP.url.test('')).toBe(true); // optional
    });
    it('does not match invalid urls', () => {
      expect(REGEXP.url.test('example')).toBe(false);
      expect(REGEXP.url.test('http:/example.com')).toBe(false);
      expect(REGEXP.url.test('http://')).toBe(false);
    });
  });

  describe('currency', () => {
    it('matches valid currency formats', () => {
      expect(REGEXP.currency.test('123')).toBe(true);
      expect(REGEXP.currency.test('-123')).toBe(true);
      expect(REGEXP.currency.test('123.45')).toBe(true);
      expect(REGEXP.currency.test('123,45')).toBe(true);
      expect(REGEXP.currency.test('123/45')).toBe(true);
      expect(REGEXP.currency.test('-123.45')).toBe(true);
      expect(REGEXP.currency.test('.45')).toBe(true);
      expect(REGEXP.currency.test('0.99')).toBe(true);
    });
    it('does not match invalid currency formats', () => {
      expect(REGEXP.currency.test('123.456')).toBe(false); // too many decimals
      expect(REGEXP.currency.test('123,456')).toBe(false); // too many decimals
      expect(REGEXP.currency.test('abc')).toBe(false);
      expect(REGEXP.currency.test('--123')).toBe(false);
      expect(REGEXP.currency.test('123..45')).toBe(false);
    });
  });
});
