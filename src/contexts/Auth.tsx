import { User } from '@/dtos/User';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useLocalStorage<{ user: User; token: string }>('USER');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<AuthContextType['token']>(null);

  useEffect(() => {
    if (session) {
      login(session.user, session.token);
    } else {
      logout();
    }
  }, [session]);

  const login = (user: User, token: string) => {
    setSession({ user, token });
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>{children}</AuthContext.Provider>
  );
};
