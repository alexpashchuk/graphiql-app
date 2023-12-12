import * as yup from 'yup';
import {
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD_CHARACTER,
  REGEX_PASSWORD_LOWER,
  REGEX_PASSWORD_NUMERIC,
  REGEX_PASSWORD_UPPER,
} from '@/constants/constants.ts';

export const signUpSchema = yup.object({
  name: yup.string().trim().required('Field is required').matches(REGEX_NAME, 'The first letter must be uppercase'),
  email: yup
    .string()
    .required('Field is required')
    .email('Invalid entry. Please enter valid email address, for example, john@smith.com.')
    .matches(REGEX_EMAIL, 'Invalid entry. Please enter valid email address, for example, john@smith.com.'),
  password: yup
    .string()
    .required('Field is required')

    .matches(REGEX_PASSWORD_LOWER, 'Password must contain at least one lower case letter [a-z]')
    .matches(REGEX_PASSWORD_UPPER, 'Password must contain at least one upper case letter [A-Z]')
    .matches(REGEX_PASSWORD_NUMERIC, 'Password must contain at least one numeric character [0-9]')
    .matches(
      REGEX_PASSWORD_CHARACTER,
      'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    )
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Field is required')
    .oneOf([yup.ref('password')], 'Your passwords do not match')
    .matches(REGEX_PASSWORD_LOWER, 'Password must contain at least one lower case letter [a-z]')
    .matches(REGEX_PASSWORD_UPPER, 'Password must contain at least one upper case letter [A-Z]')
    .matches(REGEX_PASSWORD_NUMERIC, 'Password must contain at least one numeric character [0-9]')
    .matches(
      REGEX_PASSWORD_CHARACTER,
      'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    )
    .min(8, 'Password must be at least 8 characters'),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required('Field is required')
    .email('Invalid entry. Please enter valid email address, for example, john@smith.com.')
    .matches(REGEX_EMAIL, 'Invalid entry. Please enter valid email address, for example, john@smith.com.'),
  password: yup
    .string()
    .required('Field is required')

    .matches(REGEX_PASSWORD_LOWER, 'Password must contain at least one lower case letter [a-z]')
    .matches(REGEX_PASSWORD_UPPER, 'Password must contain at least one upper case letter [A-Z]')
    .matches(REGEX_PASSWORD_NUMERIC, 'Password must contain at least one numeric character [0-9]')
    .matches(
      REGEX_PASSWORD_CHARACTER,
      'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?'
    )
    .min(8, 'Password must be at least 8 characters'),
});

export type SignInForm = yup.InferType<typeof signInSchema>;
export type SignUpForm = yup.InferType<typeof signUpSchema>;
