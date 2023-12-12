import classes from './authPage.module.css';
import { useAuth } from '@/hooks/useAuth.ts';
import SignIn from '@/components/SignIn/signIn.tsx';
import SignUp from '@/components/SignUp/signUp.tsx';

const AuthPage = () => {
  const { view } = useAuth();

  return <section className={classes.root}>{view === 'sign-up' ? <SignUp /> : <SignIn />}</section>;
};

export default AuthPage;
