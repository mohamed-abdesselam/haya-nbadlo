import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { IntlMessageFormat } from 'intl-messageformat';

type Translations = Record<string, string>;

const useTranslation = (namespace: string) => {
  const locale = useLocale();
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/messages/${locale}.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data[namespace] || {});
        } else {
          console.error('Failed to load translations');
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [locale, namespace]);

  const t = (key: string, values?: Record<string, any>): string => {
    const translation = translations[key];

    if (!values) {
      return translation;
    }

    try {
      const message = new IntlMessageFormat(translation, locale);
      return message.format(values);
    } catch (error) {
      // console.error('Error formatting translation:', error);
      return key;
    }
  };

  return { t };
};

export default useTranslation;
