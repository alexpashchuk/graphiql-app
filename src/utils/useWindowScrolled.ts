import { useEffect, useState } from 'react';

export const useWindowScrolled = (enabled?: boolean) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (enabled) return;

    setIsScrolled(Boolean(window.scrollY));

    const handleScroll = () => {
      setIsScrolled(Boolean(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  return { isScrolled };
};
