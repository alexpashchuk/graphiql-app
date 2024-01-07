import { CSSProperties } from 'react';

import classes from './spinner.module.css';

const Spinner = ({ size = 80 }: { size?: number }) => {
  return <div className={classes.loader} style={{ '--size': `${size}px` } as CSSProperties}></div>;
};

export default Spinner;
