import * as yup from 'yup';
import {
  Locale,
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD_CHARACTER,
  REGEX_PASSWORD_LOWER,
  REGEX_PASSWORD_NUMERIC,
  REGEX_PASSWORD_UPPER,
} from '@/constants/constants.ts';
import localization from '@/localization';

export const signUpSchema = (locale: `${Locale}` = Locale.EN) => {
  const { authForm } = localization[locale];
  return yup.object({
    name: yup.string().trim().required(authForm.errors.required).matches(REGEX_NAME, authForm.errors.name),
    email: yup
      .string()
      .required(authForm.errors.required)
      .email(authForm.errors.email)
      .matches(REGEX_EMAIL, authForm.errors.email),
    password: yup
      .string()
      .required(authForm.errors.required)
      .matches(REGEX_PASSWORD_LOWER, authForm.errors.passwordLower)
      .matches(REGEX_PASSWORD_UPPER, authForm.errors.passwordUpper)
      .matches(REGEX_PASSWORD_NUMERIC, authForm.errors.passwordNumeric)
      .matches(REGEX_PASSWORD_CHARACTER, authForm.errors.passwordCharacter)
      .min(8, authForm.errors.passwordLength),
    confirmPassword: yup
      .string()
      .required(authForm.errors.required)
      .oneOf([yup.ref('password')], authForm.errors.confirmPassword)
      .matches(REGEX_PASSWORD_LOWER, authForm.errors.passwordLower)
      .matches(REGEX_PASSWORD_UPPER, authForm.errors.passwordUpper)
      .matches(REGEX_PASSWORD_NUMERIC, authForm.errors.passwordNumeric)
      .matches(REGEX_PASSWORD_CHARACTER, authForm.errors.passwordCharacter)
      .min(8, authForm.errors.passwordLength),
  });
};

export const signInSchema = (locale: `${Locale}` = Locale.EN) => {
  const { authForm } = localization[locale];
  return yup.object({
    email: yup
      .string()
      .required(authForm.errors.required)
      .email(authForm.errors.email)
      .matches(REGEX_EMAIL, authForm.errors.email),
    password: yup
      .string()
      .required(authForm.errors.required)
      .matches(REGEX_PASSWORD_LOWER, authForm.errors.passwordLower)
      .matches(REGEX_PASSWORD_UPPER, authForm.errors.passwordUpper)
      .matches(REGEX_PASSWORD_NUMERIC, authForm.errors.passwordNumeric)
      .matches(REGEX_PASSWORD_CHARACTER, authForm.errors.passwordCharacter)
      .min(8, authForm.errors.passwordLength),
  });
};
const signIn = signInSchema();
export type SignInForm = yup.InferType<typeof signIn>;
const signUp = signUpSchema();
export type SignUpForm = yup.InferType<typeof signUp>;
