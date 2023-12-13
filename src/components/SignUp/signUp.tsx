import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpForm, signUpSchema } from '@/utils/authValidationSchema.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import InputText from '@/components/InputText/inputText.tsx';
import { useLocalization } from '@/hooks/useLocalization';

const SignUp = () => {
  const { LocalizationData } = useLocalization();
  const { authForm } = LocalizationData;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    try {
      // https://app.asana.com/0/1206001149209373/1206122469224992
    } catch (e) {
      errorHandling(e);
    }
  });

  return (
    <div>
      <h1>{authForm.signUpTitle}</h1>
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
        <button type="submit">{authForm.btnText}</button>
      </form>
    </div>
  );
};

export default SignUp;
