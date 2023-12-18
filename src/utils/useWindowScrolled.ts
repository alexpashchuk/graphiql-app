import { useEffect, useState } from 'react';

export const useWindowScrolled = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(Boolean(window.scrollY));

    const handleScroll = () => {
      setIsScrolled(Boolean(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrolled };
};
