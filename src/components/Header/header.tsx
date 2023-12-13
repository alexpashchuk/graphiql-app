import { Link, NavLink } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useRedux.ts';
import { setUserView } from '@/store/slices/userSlice.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import classes from './header.module.css';
import { useLocalization } from '@/hooks/useLocalization';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const { handleSwitchLocale, locale, LocalizationData } = useLocalization();
  const { navMenu } = LocalizationData;

  const handleLogOut = async () => {
    // https://app.asana.com/0/1206001149209373/1206122469224992
  };

  return (
    <header className={classes.header}>
      <div className="container">
        <nav className={classes.nav}>
          <NavLink className={classes.link} to="/">
            {navMenu.welcome}
          </NavLink>
          {isAuth ? (
            <div className={classes.authNav}>
              <button onClick={handleLogOut}>{navMenu.logout}</button>
            </div>
          ) : (
            <div className={classes.authNav}>
              <Link to={'/auth'}>
                <button onClick={() => dispatch(setUserView('sign-in'))}>{navMenu.signIn}</button>
              </Link>
              <Link to={'/auth'}>
                <button onClick={() => dispatch(setUserView('sign-up'))}>{navMenu.signUp}</button>
              </Link>
            </div>
          )}
          <span className={classes.langBtn} onClick={handleSwitchLocale}>
            {locale}
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
