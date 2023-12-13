import { useLocalization } from '@/hooks/useLocalization';
import classes from './errorPage.module.css';

const ErrorPage = () => {
  const { LocalizationData } = useLocalization();
  const { errorPage } = LocalizationData;
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>{errorPage.title}</h1>
      <p className={classes.text}>{errorPage.text}</p>
      <a className={classes.errorBtn} href="/">
        {errorPage.btnText}
      </a>
    </section>
  );
};

export default ErrorPage;
