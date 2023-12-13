export default {
  navMenu: {
    welcome: 'Добро пожаловать',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    logout: 'Выйти',
  },
  authForm: {
    signInTitle: 'Вход',
    signUpTitle: 'Регистрация',
    emailLabel: 'Электронная почта',
    passwordLabel: 'Пароль',
    nameLabel: 'Имя',
    confirmPasswordLabel: 'Подтвердите пароль',
    passwordStrength: 'Сложность пароля',
    btnText: 'Отправить',
    showPassword: 'Показать пароль',
    hidePassword: 'Спрятать пароль',
    noNaveAccount: 'Еще нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',
    errors: {
      name: 'Первая буква должна быть заглавной',
      email: 'Неверный формат. Пожалуйста, введите корректный адрес электронной почты, например, john@smith.com.',

      passwordUpper: 'Пароль должен содержать хотя бы одну заглавную букву [A-Z]',
      passwordLower: 'Пароль должен содержать хотя бы одну строчную букву [a-z]',
      passwordNumeric: 'Пароль должен содержать хотя бы одну цифру [0-9]',
      passwordCharacter: 'Пароль должен содержать хотя бы один специальный символ: ~`!@#$%^&*()-_+={}[]|\\;:"<>,./?',
      passwordLength: 'Пароль должен быть не менее 8 символов',

      confirmPassword: 'Пароли не совпадают',
      required: 'Обязательное поле',
    },
  },

  errorPage: {
    title: 'Ошибка',
    text: 'Что-то пошло не так',
    btnText: 'На главную',
  },
  notFoundPage: {
    text: 'Страница не найдена',
    btnText: 'На главную',
  },
  welcomePage: {
    toEditor: 'Перейти в редактор',
  },
  graphiQLPage: {},
};
