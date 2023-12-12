import clsx from 'clsx';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { InputTextProps } from '@/types/types.ts';
import LogoEye from '@/assets/icons/eye.svg';
import LogoEyeSlash from '@/assets/icons/eye-slash.svg';
import ProgressBar from '@/components/ProgressBar/progressBar.tsx';

import classes from './inputText.module.css';

const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
  const { field, labelText, type = 'text', autocomplete = 'on', error, register, password, isProgress } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <label className={classes.label} htmlFor={field}>
          {labelText}
        </label>
        <div className={classes.inputWrapper}>
          <input
            className={clsx(classes.input, error ? classes.errorInput : null)}
            id={field}
            type={type === 'password' && showPassword ? 'text' : type}
            autoComplete={autocomplete}
            {...register(field)}
          />
          {type === 'password' ? (
            <div
              role="button"
              aria-label={showPassword ? 'Show password' : 'Hide password'}
              className={classes.showHide}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <LogoEye /> : <LogoEyeSlash />}
            </div>
          ) : null}
        </div>
        {isProgress ? <ProgressBar password={password} /> : null}
      </div>
      <p className={classes.errorMessage}>{error ? <span>{error}</span> : null}</p>
    </div>
  );
};

export default InputText;
