import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { SignInForm, signInSchema } from '@/utils/authValidationSchema.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import InputText from '@/components/InputText/inputText.tsx';
import { useLocalization } from '@/hooks/useLocalization';
import Spinner from '@/components/Spinner/spinner.tsx';
import Button from '@/components/Button/button.tsx';
import { logInWithEmailAndPassword } from '@/firebase/firebase.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import { ButtonPriority, ButtonType, SIGN_UP } from '@/constants/constants.ts';
import { useAppDispatch } from '@/hooks/useRedux.ts';

import classes from '@/components/SignUp/signUp.module.css';

const SignIn = () => {
  const { LocalizationData, locale } = useLocalization();
  const { authForm, navMenu } = LocalizationData;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInForm>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema(locale)),
  });

  useEffect(() => {
    Object.keys(errors).forEach(async (fieldName) => {
      const path = fieldName as keyof SignInForm;
      try {
        await signInSchema(locale).validate({ path });
      } catch (err) {
        setError(path, {
          type: 'manual',
          message: (err as Error).message,
        });
      }
    });
  }, [errors, locale, setError]);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      await logInWithEmailAndPassword(email, password);
      setIsLoading(false);
    } catch (err) {
      errorHandling(err);
    }
  });

  return (
    <div className={classes.root}>
      {isLoading && <Spinner />}
      <h1 className={classes.title}>{authForm.signInTitle}</h1>
      <form noValidate onSubmit={onSubmit}>
        <InputText
          dataTestId="email"
          field="email"
          labelText={authForm.emailLabel}
          type="email"
          register={register}
          error={errors.email?.message}
        />
        <InputText
          dataTestId="password"
          field="password"
          labelText={authForm.passwordLabel}
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <Button text={authForm.btnText} type={ButtonType.SUBMIT} className={classes.buttonSubmit} />
      </form>
      <div className={classes.view}>
        <p>{authForm.noNaveAccount}</p>
        <Button
          text={navMenu.signUp}
          priority={ButtonPriority.SECONDARY}
          onClick={() => dispatch(setAuthView(SIGN_UP))}
        />
      </div>
    </div>
  );
};

export default SignIn;
