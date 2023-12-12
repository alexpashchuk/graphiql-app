import usePasswordStrength from '@/hooks/usePasswordStrength.ts';

import classes from './progressBar.module.css';

type ProgressBarProps = {
  password: string | undefined;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { password } = props;
  const strength = usePasswordStrength(password);

  return (
    <div className={classes.wrapper}>
      <label htmlFor="progress">Password Strength</label>
      <progress className={classes.progress} id="progress" max="5" defaultValue="0" value={strength} />
    </div>
  );
};

export default ProgressBar;
