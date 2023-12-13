import { Locale } from '@/constants/constants';
import { createContext, ReactNode, useState } from 'react';

type LocalizationContextType = {
  locale: Locale;
  handleSwitchLocale: () => void;
};

const initialContext: LocalizationContextType = {
  locale: Locale.EN,
  handleSwitchLocale: () => {},
};

export const LocalizationContext = createContext<LocalizationContextType>(initialContext);

type LocalizationProviderProps = {
  children: ReactNode;
};

export const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  const localeList = Object.values(Locale);
  const [currentLocaleIndex, setCurrentLocaleIndex] = useState(0);

  const handleSwitchLocale = () => setCurrentLocaleIndex((prev) => (prev + 1) % localeList.length);

  const contextValue: LocalizationContextType = {
    locale: localeList[currentLocaleIndex] ?? Locale.EN,
    handleSwitchLocale,
  };

  return <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>;
};
