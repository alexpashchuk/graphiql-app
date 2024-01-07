import clsx from 'clsx';

import LogoRss from '@/assets/icons/rs-school.svg';
import LogoGitHub from '@/assets/icons/github.svg';

import classes from './footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={clsx('container', classes.footerWrapper)}>
        <a href="https://rs.school/react" target="_blank" rel="noreferrer" className={classes.link}>
          <LogoRss className={classes.logoRss} />
        </a>
        <p>2023</p>
        <a href="https://github.com/alexpashchuk" target="_blank" rel="noreferrer" className={classes.link}>
          <LogoGitHub className={classes.logoGitHub} />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
