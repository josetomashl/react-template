import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from 'react';

export type LocaleType = 'en' | 'es';
type Translations = Record<string, string>;

interface ContextProps {
  language: LocaleType | null;
  setLanguage: (lang: LocaleType) => void;
  trans: (key: string, args?: Translations) => string;
}

const LanguageContext = createContext<ContextProps>({
  language: null,
  trans: () => 'Not translated',
  setLanguage: () => undefined
});

const LanguageProvider = (props: PropsWithChildren) => {
  // Determine the default language from the browser or user system
  const defaultLanguage = (navigator.language.split('-')[0] as LocaleType) || 'en';

  const [language, setLanguage] = useLocalStorage<LocaleType>('LANGUAGE', defaultLanguage);
  const [translations, setTranslations] = useState<Translations>({});

  // Load translations whenever the language changes
  useEffect(() => {
    document.documentElement.lang = language || defaultLanguage;
    loadTranslations(language as LocaleType).then((data) => setTranslations(data));
  }, [language, defaultLanguage]);

  // Function to translate a given key
  const trans = useCallback(
    (key: string, args: Record<string, string> = {}): string => {
      const template = translations[key] || key;
      if (Object.keys(args).length === 0) {
        return template;
      }
      return replacePlaceholders(template, args);
    },
    [translations]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        trans
      }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };

/**
 * Asynchronously loads translation data for the specified language.
 *
 * Attempts to import a JSON file containing translations for the given `language`.
 * If the import fails (e.g., the file does not exist), it falls back to loading
 * the English translations and logs a warning to the console.
 *
 * @param language - The locale identifier (e.g., 'en', 'es', 'fr') for which to load translations.
 * @returns A promise that resolves to the loaded `Translations` object.
 */
async function loadTranslations(language: LocaleType): Promise<Translations> {
  try {
    const translations = await import(`../assets/translations/${language}.json`);
    return translations.default;
  } catch {
    console.warn(`Could not load translations for language: ${language}. Default language set to English.`);
    const defaultTranslations = await import(`../assets/translations/en.json`);
    return defaultTranslations.default;
  }
}

/**
 * Replaces placeholders in a string with provided arguments.
 * Placeholders should be in the format `{{key}}`.
 */
function replacePlaceholders(template: string, args: Record<string, string>): string {
  return template.replace(/{{(.*?)}}/g, (_, key) => args[key] || `{${key}}`);
}
