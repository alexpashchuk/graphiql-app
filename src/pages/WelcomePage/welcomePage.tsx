import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.ts';

import LogoRss from '@/assets/icons/rs-school.svg';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { paths } from '@/constants/constants.ts';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { useLocalization } from '@/hooks/useLocalization.ts';
import Button from '@/components/Button/button.tsx';
import Spinner from '@/components/Spinner/spinner.tsx';

import classes from './welcomePage.module.css';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);
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

  const authNav = user ? (
    <Button linkHref={paths.main} text={welcomePage.toEditor} />
  ) : (
    <div className={classes.authNav}>
      <Button text={navMenu.signIn} onClick={handleSignIn} />
      <Button text={navMenu.signUp} onClick={handleSignUp} />
    </div>
  );

  return (
    <section className={classes.root}>
      <p className={classes.titleWelcome}>{welcomePage.welcomeTitle}</p>
      <div className={classes.buttonsWrapper}>{isLoading ? <Spinner size={35} /> : authNav}</div>
      <div className={classes.developers}>
        <p className={classes.title}>{welcomePage.developers}</p>
        <div className={classes.devContent}>
          <a href="https://github.com/alexpashchuk" target="_blank" rel="noreferrer" className={classes.link}>
            <p>{welcomePage.alexey}</p>
          </a>
          <a href="https://github.com/olgamartinchik" target="_blank" rel="noreferrer" className={classes.link}>
            <p>{welcomePage.volha}</p>
          </a>
        </div>
      </div>
      <div className={classes.sponsored}>
        <p className={classes.title}>{welcomePage.sponsored}</p>
        <div className={classes.rssAbout}>
          <a href="https://rs.school/react" target="_blank" rel="noreferrer" className={classes.link}>
            <LogoRss className={classes.logoRss} />
          </a>
          <p className={classes.text}>{welcomePage.rssAbout}</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
