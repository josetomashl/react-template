const match = (v1: string, v2: string) => v1 === v2 || 'Las campos no coinciden';
const max = (v: string, n = 3) => !v || v.length <= n || `Máximo ${n} caracteres`;
const min = (v: string, n = 3) => !v || v.length >= n || `Mínimo ${n} caracteres`;

export const RULES = {
  match,
  max,
  min
};
