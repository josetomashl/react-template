import type { AuthResponse, LoginRequest, RefreshRequest, RegisterRequest } from '@/dtos/Auth';
import { useCookie } from '@/hooks/useCookie';
import { CookieKeys } from '@/plugins/constants/cookies';
import { useAppDispatch } from '@/store';
import { requestLogin, requestRefresh, requestRegister, resetMe } from '@/store/modules/auth';
import { createContext, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  login: (data: LoginRequest) => void;
  register: (data: RegisterRequest) => void;
  refresh: (data: RefreshRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useCookie<string | null>(CookieKeys.USER_TOKEN, null);
  const [refreshToken, setRefreshToken] = useCookie<string | null>(CookieKeys.USER_REFRESH_TOKEN, null);

  const login = async (data: LoginRequest) => {
    const res = await dispatch(requestLogin(data));
    if (res.payload) {
      const pl = res.payload as AuthResponse;
      setToken(pl.token);
      setRefreshToken(pl.refreshToken);
      navigate('/');
    }
  };

  const register = async (data: RegisterRequest) => {
    const res = await dispatch(requestRegister(data));
    if (res.payload) {
      const pl = res.payload as AuthResponse;
      setToken(pl.token);
      setRefreshToken(pl.refreshToken);
      navigate('/');
    }
  };

  const refresh = async (data: RefreshRequest) => {
    const res = await dispatch(requestRefresh(data));
    if (res.payload) {
      const pl = res.payload as AuthResponse;
      setToken(pl.token);
      setRefreshToken(pl.refreshToken);
      navigate('/');
    }
  };

  const logout = () => {
    dispatch(resetMe());
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, register, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
