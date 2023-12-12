import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInForm, signInSchema } from '@/utils/authValidationSchema.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import InputText from '@/components/InputText/inputText.tsx';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      // https://app.asana.com/0/1206001149209373/1206122469224992
    } catch (e) {
      errorHandling(e);
    }
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form noValidate onSubmit={onSubmit}>
        <InputText field="email" labelText="Email" type="email" register={register} error={errors.email?.message} />
        <InputText
          field="password"
          labelText="Password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
