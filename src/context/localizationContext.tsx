import { createContext, ReactNode, useState } from 'react';
type Language = 'en' | 'ru';
type LocalizationContextType = {
  lang: Language;
  switchLang: () => void;
};

const initialContext: LocalizationContextType = {
  lang: 'en',
  switchLang: () => {},
};

export const LocalizationContext = createContext<LocalizationContextType>(initialContext);

type LocalizationProviderProps = {
  children: ReactNode;
};

export const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  const [lang, setLang] = useState<Language>('en');
  const isEnLang = lang === 'en';

  const switchLang = () => {
    setLang(isEnLang ? 'ru' : 'en');
  };

  const contextValue: LocalizationContextType = {
    lang,
    switchLang,
  };

  return <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>;
};
