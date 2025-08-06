import { TranslationContext } from '@/contexts/translationContext';
import { useContext } from 'react';

export default function useTranslations() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslations must be used within TranslationProvider');
  }

  return context;
}
