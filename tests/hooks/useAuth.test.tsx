import { type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { AuthProvider } from '@/contexts/authContext';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

describe('useAuth', () => {
  it('throws error when used outside AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrowError('useAuth hook must be used within AuthProvider');
  });

  it('returns context value when used inside AuthProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </BrowserRouter>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.login).toBeDefined();
    expect(result.current.logout).toBeDefined();
    expect(result.current.register).toBeDefined();
    expect(result.current.token).toBeDefined();
  });
});
