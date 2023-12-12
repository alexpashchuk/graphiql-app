import { Link, NavLink } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useRedux.ts';
import { setUserView } from '@/store/slices/userSlice.tsx';
import { useAuth } from '@/hooks/useAuth.ts';

import classes from './header.module.css';
import { useContext } from 'react';
import { LocalizationContext } from '@/context/localizationContext';
import localization from '@/localization';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const { switchLang, lang } = useContext(LocalizationContext);
  const { auth, welcomePage } = localization[lang];

  const handleLogOut = async () => {
    // https://app.asana.com/0/1206001149209373/1206122469224992
  };

  return (
    <header className={classes.header}>
      <div className="container">
        <nav className={classes.nav}>
          <NavLink className={classes.link} to="/">
            {welcomePage}
          </NavLink>
          {isAuth ? (
            <div className={classes.authNav}>
              <button onClick={handleLogOut}>Logout</button>
            </div>
          ) : (
            <div className={classes.authNav}>
              <Link to={'/auth'}>
                <button onClick={() => dispatch(setUserView('sign-in'))}>{auth.singIn}</button>
              </Link>
              <Link to={'/auth'}>
                <button onClick={() => dispatch(setUserView('sign-up'))}>{auth.singUp}</button>
              </Link>
            </div>
          )}
          <span className={classes.langBtn} onClick={switchLang}>
            {lang}
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
