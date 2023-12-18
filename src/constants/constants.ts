export const REGEX_NAME = /^[A-ZА-ЯЁ]/;
export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
export const REGEX_PASSWORD_LOWER = /[a-z]/;
export const REGEX_PASSWORD_UPPER = /[A-Z]/;
export const REGEX_PASSWORD_NUMERIC = /[0-9]/;
export const REGEX_PASSWORD_CHARACTER = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
export enum Locale {
  EN = 'en',
  RU = 'ru',
}

export enum paths {
  welcome = '/',
  main = '/editor',
  auth = '/auth',
}

export const SIGN_IN = 'sign-in';
export const SIGN_UP = 'sign-up';

export const TabEnum = {
  VARIABLES: 'Variables',
  HEADERS: 'Headers',
};
