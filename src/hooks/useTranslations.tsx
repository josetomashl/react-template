import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type LocaleType = 'en' | 'es';
type Translations = Record<string, string>;

async function loadTranslations(language: LocaleType): Promise<Translations> {
  try {
    const translations = await import(`../assets/translations/${language}.json`);
    return translations.default;
  } catch {
    console.warn(`Could not load translations for language: ${language}. Default language set to English.`);
    // Fallback to English if the specified language file is not found
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

export default function useTranslation() {
  // Determine the default language from the browser or user system
  const defaultLanguage = (navigator.language.split('-')[0] as LocaleType) || 'en';

  // Store the selected language in localStorage
  const [language, setLanguage] = useLocalStorage<LocaleType>('LANGUAGE', defaultLanguage);
  const [translations, setTranslations] = useState<Translations>({});

  // Load translations whenever the language changes
  useEffect(() => {
    document.documentElement.lang = language || defaultLanguage;
    loadTranslations(language as LocaleType).then(setTranslations);
  }, [language]);

  // Function to translate a given key
  const trans = (key: string, args: Record<string, string> = {}): string => {
    const template = translations[key] || key;
    return replacePlaceholders(template, args);
  };

  return { trans, setLanguage, language };
}
