import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpForm, signUpSchema } from '@/utils/authValidationSchema.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import InputText from '@/components/InputText/inputText.tsx';

const SignUp = () => {
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
      // TODO: firebase auth
    } catch (e) {
      errorHandling(e);
    }
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <form noValidate onSubmit={onSubmit}>
        <InputText field="name" labelText="Name" register={register} error={errors.name?.message} />
        <InputText field="email" labelText="Email" type="email" register={register} error={errors.email?.message} />
        <InputText
          field="password"
          labelText="Password"
          type="password"
          register={register}
          password={watch('password')}
          error={errors.password?.message}
          isProgress
        />
        <InputText
          field="confirmPassword"
          labelText="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
