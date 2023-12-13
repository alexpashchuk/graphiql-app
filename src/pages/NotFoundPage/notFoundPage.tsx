import { Link } from 'react-router-dom';

import classes from './notFoundPage.module.css';
import { useLocalization } from '@/hooks/useLocalization';

const NotFoundPage = () => {
  const { LocalizationData } = useLocalization();
  const { notFoundPage } = LocalizationData;
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.text}>{notFoundPage.text}</p>
      <Link className={classes.backHome} to="/">
        {notFoundPage.btnText}
      </Link>
    </section>
  );
};

export default NotFoundPage;
