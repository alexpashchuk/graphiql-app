import SignIn from '@/components/SignIn/signIn.tsx';
import SignUp from '@/components/SignUp/signUp.tsx';
import { useAppSelector } from '@/hooks/useRedux.ts';
import { selectAuthView } from '@/store/slices/userSlice.tsx';
import { SIGN_UP } from '@/constants/constants.ts';

import classes from './authPage.module.css';

const AuthPage = () => {
  const { view } = useAppSelector(selectAuthView);

  return <section className={classes.root}>{view === SIGN_UP ? <SignUp /> : <SignIn />}</section>;
};

export default AuthPage;
