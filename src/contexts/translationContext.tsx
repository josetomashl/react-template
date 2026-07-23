import { createContext, type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';

const SUPPORTED_LOCALES = ['en', 'es'];
const FALLBACK_LOCALE = 'en';

interface ContextProps {
  language: string | null;
  setLanguage: (lang: string) => void;
  translate: (key: string, args?: Record<string, string>) => string;
}

const TranslationContext = createContext<ContextProps | null>(null);

const TranslationProvider = ({ children }: PropsWithChildren) => {
  const defaultLanguage = normalizeLocale(navigator.language);

  const [language, setLanguage] = useLocalStorage('LANGUAGE', defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    const value = language ?? defaultLanguage;
    document.documentElement.lang = value;

    loadTranslations(value).then((data) => {
      if (active) setTranslations(data);
    });

    return () => {
      active = false;
    };
  }, [language, defaultLanguage]);

  const translate = useCallback(
    (key: string, args?: Record<string, string>): string => {
      const template = translations[key] || key;
      if (args && Object.keys(args).length > 0) {
        return template.replace(/{{(.*?)}}/g, (_, token: string) => {
          const name = token.trim();
          return args[name] ?? `{${name}}`;
        });
      }
      return template;
    },
    [translations]
  );

  const value = useMemo<ContextProps>(() => ({ language, setLanguage, translate }), [language, setLanguage, translate]);

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export { TranslationContext, TranslationProvider };

function normalizeLocale(value: string) {
  const base = value.split('-')[0].toLowerCase();
  return SUPPORTED_LOCALES.includes(base) ? base : FALLBACK_LOCALE;
}

/**
 * Carga de forma asíncrona las traducciones del idioma indicado.
 *
 * Intenta importar el JSON correspondiente a `language`. Si falla (p. ej. el
 * archivo no existe), recurre a las traducciones en inglés y avisa por consola.
 *
 * @param language - Locale a cargar (p. ej. 'en', 'es').
 * @returns Promesa que resuelve al objeto `Translations` cargado.
 */
async function loadTranslations(language: string): Promise<Record<string, string>> {
  try {
    if (!language) {
      throw new Error();
    }
    const translations = await import(`../assets/translations/${language}.json`);
    return translations.default;
  } catch {
    console.warn(`Could not load translations for language: "${language}". Default language set to English.`);
    const defaultTranslations = await import(`../assets/translations/${FALLBACK_LOCALE}.json`);
    return defaultTranslations.default;
  }
}
