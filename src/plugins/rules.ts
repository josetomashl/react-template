const match = (v1: string, v2: string, fieldName?: string) =>
  v1 === v2 || (fieldName ? `Debe coincidir con el campo "${fieldName}".` : 'Las campos no coinciden.');
const maxLength = (v: string, n = 3) => !v || v.length <= n || `Máximo ${n} caracteres.`;
const minLength = (v: string, n = 3) => !v || v.length >= n || `Mínimo ${n} caracteres.`;
const max = (v: number, n: number) => !v || v <= n || `Debe ser menor o igual a ${n}`;
const min = (v: number, n: number) => !v || v >= n || `Debe ser mayor o igual a ${n}`;

export const RULES = {
  match,
  maxLength,
  minLength,
  max,
  min
};
