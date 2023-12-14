export default {
  navMenu: {
    welcome: 'Welcome Page',
    signIn: 'Sign in',
    signUp: 'Sign up',
    logout: 'Logout',
  },
  authForm: {
    signInTitle: 'Sign In',
    signUpTitle: 'Sign Up',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Name',
    confirmPasswordLabel: 'Confirm Password',
    passwordStrength: 'Password Strength',
    btnText: 'Submit',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    noNaveAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    errors: {
      name: 'The first letter must be uppercase',
      email: 'Invalid entry. Please enter valid email address, for example, john@smith.com.',

      passwordUpper: 'Password must contain at least one upper case letter [A-Z]',
      passwordLower: 'Password must contain at least one lower case letter [a-z]',
      passwordNumeric: 'Password must contain at least one numeric character [0-9]',
      passwordCharacter: 'Password must contain at least one special character: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?',
      passwordLength: 'Password must be at least 8 characters',

      confirmPassword: 'Your passwords do not match',
      required: 'Field is required',
    },
  },

  welcomePage: {
    toEditor: 'Go to editor page',
  },
  graphiQLPage: {},
  errorPage: {
    title: 'Error',
    text: 'Something went wrong',
    btnText: 'Back Home',
  },
  notFoundPage: {
    text: 'Page Not Found',
    btnText: 'Back Home',
  },
};
