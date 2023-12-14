import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

import LogoUser from '@/assets/icons/user.svg';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { useLocalization } from '@/hooks/useLocalization';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import { auth, db, logout } from '@/firebase/firebase.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import { paths } from '@/constants/constants.ts';

import classes from './header.module.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const { handleSwitchLocale, locale, LocalizationData } = useLocalization();
  const { navMenu } = LocalizationData;
  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      errorHandling(err);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      fetchUserName();
    }
  }, [user, fetchUserName, navigate]);

  const handleLogOut = async () => {
    await logout();
    setName('');
    navigate(paths.auth);
  };

  return (
    <header className={classes.header}>
      <div className="container">
        <nav className={classes.nav}>
          <NavLink className={classes.link} to={paths.welcome}>
            GraphiQL
          </NavLink>
          <div className={classes.authNav}>
            {user ? (
              <div className={classes.authNav}>
                <div className={classes.authUser}>
                  <LogoUser />
                  {name && <p className={classes.name}>{name}</p>}
                </div>
                <button onClick={handleLogOut}>{navMenu.logout}</button>
              </div>
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
            <span className={classes.langBtn} onClick={handleSwitchLocale}>
              {locale}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
