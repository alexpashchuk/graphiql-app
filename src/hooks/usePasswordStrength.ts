import { useState, useEffect } from 'react';

import {
  REGEX_PASSWORD_CHARACTER,
  REGEX_PASSWORD_LOWER,
  REGEX_PASSWORD_NUMERIC,
  REGEX_PASSWORD_UPPER,
} from '@/constants/constants.ts';

export const usePasswordStrength = (password: string | undefined): number => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = (password: string | undefined) => {
      let score = 0;

      if (REGEX_PASSWORD_NUMERIC.test(password!)) {
        score++;
      }

      if (REGEX_PASSWORD_LOWER.test(password!)) {
        score++;
      }

      if (REGEX_PASSWORD_UPPER.test(password!)) {
        score++;
      }

      if (REGEX_PASSWORD_CHARACTER.test(password!)) {
        score++;
      }

      if (password && password?.length >= 8) {
        score++;
      }

      if (typeof password === 'undefined') {
        score = 0;
      }

      return score;
    };

    setStrength(calculateStrength(password));
  }, [password]);

  return strength;
};

export default usePasswordStrength;
