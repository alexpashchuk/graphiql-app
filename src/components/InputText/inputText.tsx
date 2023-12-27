import clsx from 'clsx';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { InputTextProps } from '@/types/types.ts';
import LogoEye from '@/assets/icons/eye.svg';
import LogoEyeSlash from '@/assets/icons/eye-slash.svg';
import ProgressBar from '@/components/ProgressBar/progressBar.tsx';
import { useLocalization } from '@/hooks/useLocalization';

import classes from './inputText.module.css';

const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const {
    field,
    labelText,
    type = 'text',
    autocomplete = 'on',
    error,
    register,
    password,
    isProgress,
    dataTestId,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const { LocalizationData } = useLocalization();
  const { authForm } = LocalizationData;

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <label className={classes.label} htmlFor={field}>
          {labelText}
        </label>
        <div className={classes.inputWrapper}>
          <input
            data-testid={dataTestId || ''}
            {...(Boolean(field) && register?.(field!))}
            className={clsx(classes.input, error ? classes.errorInput : null)}
            id={field}
            type={type === 'password' && showPassword ? 'text' : type}
            autoComplete={autocomplete}
          />
          {type === 'password' && (
            <div
              role="button"
              aria-label={showPassword ? authForm.showPassword : authForm.hidePassword}
              className={classes.showHide}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <LogoEye /> : <LogoEyeSlash />}
            </div>
          )}
        </div>
        {isProgress && <ProgressBar password={password} />}
      </div>
      <p className={classes.errorMessage}>{error && <span>{error}</span>}</p>
    </div>
  );
};

export default InputText;
