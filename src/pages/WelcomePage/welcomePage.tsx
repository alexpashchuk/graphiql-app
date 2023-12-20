import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.ts';

import { setAuthView } from '@/store/slices/userSlice.tsx';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { paths } from '@/constants/constants.ts';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { useLocalization } from '@/hooks/useLocalization.ts';
import Button from '@/components/Button/button.tsx';

import classes from './welcomePage.module.css';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { LocalizationData } = useLocalization();
  const { navMenu, welcomePage } = LocalizationData;

  const handleSignIn = () => {
    dispatch(setAuthView(SIGN_IN));
    navigate(paths.auth);
  };

  const handleSignUp = () => {
    dispatch(setAuthView(SIGN_UP));
    navigate(paths.auth);
  };

  return (
    <section className={classes.root}>
      <h1>Welcome Page</h1>
      {user ? (
        <Button linkHref={paths.main} text={welcomePage.toEditor} />
      ) : (
        <div className={classes.authNav}>
          <Button text={navMenu.signIn} onClick={handleSignIn} />
          <Button text={navMenu.signUp} onClick={handleSignUp} />
        </div>
      )}
    </section>
  );
};

export default WelcomePage;
