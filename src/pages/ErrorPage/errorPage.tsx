import classes from './errorPage.module.css';

const ErrorPage = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>Error</h1>
      <p className={classes.text}>Something went wrong</p>
      <a className={classes.errorBtn} href="/">
        Back Home
      </a>
    </section>
  );
};

export default ErrorPage;
