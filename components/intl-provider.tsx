'use client';

import { IntlProvider } from 'react-intl';
import { useState, createContext, type ComponentProps, type ReactNode } from 'react';
import { defaultLocale, localeConfig, type Locale } from '@/lib/locale';
type IntlProviderChildren = ComponentProps<typeof IntlProvider>['children'];

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: defaultLocale,
  setLocale: () => {},
});

interface IntlProviderWrapperProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function IntlProviderWrapper({ children, initialLocale }: IntlProviderWrapperProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        messages={localeConfig[locale].messages}
        locale={locale}
        defaultLocale={defaultLocale}
      >
        {children as IntlProviderChildren}
      </IntlProvider>
    </LocaleContext.Provider>
  );
} 
