import { LocalizationContext } from '@/context/localizationContext';
import localization from '@/localization';
import { useContext } from 'react';

export const useLocalization = () => {
  const { handleSwitchLocale, locale } = useContext(LocalizationContext);
  const LocalizationData = localization[locale];

  return { handleSwitchLocale, locale, LocalizationData };
};
