import type { UserItem } from './User';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface RefreshRequest {
  refreshToken: string;
}
export interface AuthResponse {
  customer: UserItem;
  token: string;
  refreshToken: string;
}
