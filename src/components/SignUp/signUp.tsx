import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { SignUpForm, signUpSchema } from '@/utils/authValidationSchema.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import InputText from '@/components/InputText/inputText.tsx';
import { useLocalization } from '@/hooks/useLocalization';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { registerWithEmailAndPassword } from '@/firebase/firebase.ts';
import Spinner from '@/components/Spinner/spinner.tsx';
import Button from '@/components/Button/button.tsx';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import { ButtonPriority, ButtonType, SIGN_IN } from '@/constants/constants.ts';

import classes from './signUp.module.css';

const SignUp = () => {
  const { LocalizationData, locale } = useLocalization();
  const { authForm, navMenu } = LocalizationData;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignUpForm>({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema(locale)),
  });

  useEffect(() => {
    Object.keys(errors).forEach(async (fieldName) => {
      const path = fieldName as keyof SignUpForm;
      try {
        await signUpSchema(locale).validate({ path });
      } catch (err) {
        setError(path, {
          type: 'manual',
          message: (err as Error).message,
        });
      }
    });
  }, [errors, locale, setError]);

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    try {
      setIsLoading(true);
      await registerWithEmailAndPassword(name, email, password);
      setIsLoading(false);
    } catch (err) {
      errorHandling(err);
    }
  });

  return (
    <div className={classes.root}>
      {isLoading && <Spinner />}
      <h1 className={classes.title}>{authForm.signUpTitle}</h1>
      <form noValidate onSubmit={onSubmit}>
        <InputText field="name" labelText={authForm.nameLabel} register={register} error={errors.name?.message} />
        <InputText
          field="email"
          labelText={authForm.emailLabel}
          type="email"
          register={register}
          error={errors.email?.message}
        />
        <InputText
          field="password"
          labelText={authForm.passwordLabel}
          type="password"
          register={register}
          password={watch('password')}
          error={errors.password?.message}
          isProgress
        />
        <InputText
          field="confirmPassword"
          labelText={authForm.confirmPasswordLabel}
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <Button text={authForm.btnText} type={ButtonType.SUBMIT} className={classes.buttonSubmit} />
      </form>
      <div className={classes.view}>
        <p>{authForm.haveAccount}</p>
        <Button
          text={navMenu.signIn}
          priority={ButtonPriority.SECONDARY}
          onClick={() => dispatch(setAuthView(SIGN_IN))}
        />
      </div>
    </div>
  );
};

export default SignUp;
