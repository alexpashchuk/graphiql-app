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
  const [currentLocaleIndex, setCurrentLocaleIndex] = useState(() => {
    const savedLocaleIndex = localStorage.getItem('LocaleIndex');
    const parsedIndex = savedLocaleIndex ? parseInt(savedLocaleIndex, 10) : 0;
    return isNaN(parsedIndex) ? 0 : parsedIndex;
  });

  const handleSwitchLocale = () => {
    setCurrentLocaleIndex((prev) => {
      const newIndex = (prev + 1) % localeList.length;
      localStorage.setItem('LocaleIndex', newIndex.toString());
      return newIndex;
    });
  };

  const contextValue: LocalizationContextType = {
    locale: localeList[currentLocaleIndex] ?? Locale.EN,
    handleSwitchLocale,
  };

  return <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>;
};
