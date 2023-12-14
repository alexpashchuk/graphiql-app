import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.ts';

import { setAuthView } from '@/store/slices/userSlice.tsx';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { paths } from '@/constants/constants.ts';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { useLocalization } from '@/hooks/useLocalization.ts';

import classes from './welcomePage.module.css';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const { LocalizationData } = useLocalization();
  const { navMenu, welcomePage } = LocalizationData;

  return (
    <section className={classes.root}>
      <h1>Welcome Page</h1>
      {user ? (
        <Link to={paths.main}>{welcomePage.toEditor}</Link>
      ) : (
        <div className={classes.authNav}>
          <Link to={paths.auth}>
            <button onClick={() => dispatch(setAuthView(SIGN_IN))}>{navMenu.signIn}</button>
          </Link>
          <Link to={paths.auth}>
            <button onClick={() => dispatch(setAuthView(SIGN_UP))}>{navMenu.signUp}</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default WelcomePage;
