import { type ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

import { TranslationProvider } from '@/contexts/translationContext';
import useTranslations from '@/hooks/useTranslations';
import { renderHook } from '@testing-library/react';

describe('useTranslations', () => {
  it('throws error when used outside TranslationProvider', () => {
    expect(() => renderHook(() => useTranslations())).toThrowError(
      'useTranslations must be used within TranslationProvider'
    );
  });

  it('returns context value when used inside TranslationProvider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <TranslationProvider>{children}</TranslationProvider>;

    const { result } = renderHook(() => useTranslations(), { wrapper });
    expect(result.current.language).toBeDefined();
    expect(result.current.trans).toBeDefined();
    expect(result.current.setLanguage).toBeDefined();
  });
});
