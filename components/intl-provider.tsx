'use client';

import { IntlProvider } from 'react-intl';
import { useEffect, useState, createContext } from 'react';
import zhCN from '../i18n/zh-CN';
import zhTW from '../i18n/zh-TW';
import en from '../i18n/en';

const messages = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
};

type Locale = keyof typeof messages;

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: 'zh-CN',
  setLocale: () => {},
});

export function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh-CN');

  useEffect(() => {
    const browserLocale = navigator.language;
    if (browserLocale.startsWith('zh')) {
      setLocale(browserLocale === 'zh-TW' ? 'zh-TW' : 'zh-CN');
    } else {
      setLocale('en');
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="zh-CN"
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
} 