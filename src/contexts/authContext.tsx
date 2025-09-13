import { createContext, useState, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

import type { AuthResponse, LoginRequest, RefreshRequest, RegisterRequest } from '@/dtos/Auth';
import type { UserItem } from '@/dtos/User';
import { useCookie } from '@/hooks/useCookie';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axiosInstance, { BaseResponse } from '@/plugins/axios';
import { CookieKeys } from '@/plugins/constants/cookies';
import { StorageKeys } from '@/plugins/constants/storage';

interface AuthContextType {
  isLoading: boolean;
  me: UserItem | null;
  token: string | null;
  refreshToken: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  refresh: (data: RefreshRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useLocalStorage<UserItem | null>(StorageKeys.USER, null);
  const [token, setToken] = useCookie<string | null>(CookieKeys.USER_TOKEN, null);
  const [refreshToken, setRefreshToken] = useCookie<string | null>(CookieKeys.USER_REFRESH_TOKEN, null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    const res = await axiosInstance.post<LoginRequest, BaseResponse<AuthResponse>>('/login', data);
    setIsLoading(false);
    if (res.data) {
      setMe(res.data.customer);
      setToken(res.data.token);
      setRefreshToken(res.data.refreshToken);
      navigate('/');
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    const res = await axiosInstance.post<RegisterRequest, BaseResponse<AuthResponse>>('/register', data);
    setIsLoading(false);
    if (res.data) {
      setMe(res.data.customer);
      setToken(res.data.token);
      setRefreshToken(res.data.refreshToken);
      navigate('/');
    }
  };

  const refresh = async (data: RefreshRequest) => {
    setIsLoading(true);
    const res = await axiosInstance.post<RefreshRequest, BaseResponse<AuthResponse>>('/refresh', data);
    setIsLoading(false);
    if (res.data) {
      setMe(res.data.customer);
      setToken(res.data.token);
      setRefreshToken(res.data.refreshToken);
      navigate('/');
    }
  };

  const logout = () => {
    setIsLoading(true);
    setMe(null);
    setToken(null);
    setRefreshToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoading, me, token, refreshToken, login, register, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
