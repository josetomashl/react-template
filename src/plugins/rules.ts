import { RegExp } from './constants/regExp';

const required = (v: unknown) => !!v || v === 0 || 'Campo obligatorio.';
const email = (v: string) => !v || RegExp.email.test(v) || 'Introduce un email válido.';
const password = (v: string) => !v || RegExp.password.test(v) || 'Introduce una contraseña válida.';
const phone = (v: string) => !v || RegExp.phone.test(v) || 'Introduce un teléfono válido.';
const url = (v: string) => !v || RegExp.url.test(v) || 'Introduce una url válida.';
const currency = (v: string) =>
  RegExp.currency.test(v) || 'Introduce un importe válido como 1234.56, 1234,56 ó -1234.56.';
const match = (v1: string, v2: string, fieldName?: string) =>
  v1 === v2 || (fieldName ? `Debe coincidir con el campo "${fieldName}".` : 'Las campos no coinciden.');
const maxLength = (v: string, n = 3) => !v || v.length <= n || `Máximo ${n} caracteres.`;
const minLength = (v: string, n = 3) => !v || v.length >= n || `Mínimo ${n} caracteres.`;
const max = (v: number, n: number) => !v || v <= n || `Debe ser menor o igual a ${n}`;
const min = (v: number, n: number) => !v || v >= n || `Debe ser mayor o igual a ${n}`;

export const RULES = {
  required,
  email,
  password,
  phone,
  url,
  currency,
  match,
  maxLength,
  minLength,
  max,
  min
};
