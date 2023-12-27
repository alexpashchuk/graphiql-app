import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import clsx from 'clsx';

import LogoUser from '@/assets/icons/user.svg';
import { useAppDispatch } from '@/hooks/useRedux.ts';
import { useLocalization } from '@/hooks/useLocalization';
import { paths, SIGN_IN, SIGN_UP } from '@/constants/constants.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import { auth, db, logout } from '@/firebase/firebase.ts';
import { errorHandling } from '@/utils/errorHandling.ts';
import { useWindowScrolled } from '@/utils/useWindowScrolled.ts';
import Button from '@/components/Button/button.tsx';
import Spinner from '@/components/Spinner/spinner.tsx';
import GraphQLLogo from '@/assets/icons/graphql.svg';
import MenuOpenLogo from '@/assets/icons/menu-open.svg';
import MenuCloseLogo from '@/assets/icons/menu-close.svg';

import classes from './header.module.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const { handleSwitchLocale, locale, LocalizationData } = useLocalization();
  const { navMenu } = LocalizationData;
  const [user, isLoading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isScrolled } = useWindowScrolled(isMenuOpen);

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
    setIsMenuOpen(false);
    await logout();
    setName('');
    navigate(paths.auth);
  };

  const handleSignIn = () => {
    setIsMenuOpen(false);
    dispatch(setAuthView(SIGN_IN));
    navigate(paths.auth);
  };

  const handleSignUp = () => {
    setIsMenuOpen(false);
    dispatch(setAuthView(SIGN_UP));
    navigate(paths.auth);
  };

  const authNav = user ? (
    <div className={classes.authNav}>
      <div className={classes.authUser}>
        <LogoUser className={classes.logoUser} />
        <div className={classes.name}>{name || <Spinner size={15} />}</div>
      </div>
      <Button text={navMenu.logout} onClick={handleLogOut} />
    </div>
  ) : (
    <div className={classes.authNav}>
      <Button text={navMenu.signIn} onClick={handleSignIn} />
      <Button text={navMenu.signUp} onClick={handleSignUp} />
    </div>
  );

  return (
    <header className={clsx(classes.header, isScrolled ? classes.scroll : '')}>
      <div className={clsx('container', classes.wrapper)}>
        <nav className={classes.nav}>
          <NavLink className={classes.link} to={paths.welcome}>
            <p>logo</p>
            {/* <GraphQLLogo className={classes.logo} /> */}
          </NavLink>
          <Button
            className={classes.menuTrigger}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            title={isMenuOpen ? navMenu.closeMenu : navMenu.openMenu}
          >
            {isMenuOpen ? <MenuCloseLogo /> : <MenuOpenLogo />}
          </Button>
          <div className={clsx(classes.authNavWrapper, isMenuOpen && classes.menuOpen)}>
            {isLoading ? <Spinner size={35} /> : authNav}
            <Button text={locale} onClick={handleSwitchLocale} className={classes.langBtn} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
