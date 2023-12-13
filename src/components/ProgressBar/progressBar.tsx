import usePasswordStrength from '@/hooks/usePasswordStrength.ts';

import classes from './progressBar.module.css';
import { useLocalization } from '@/hooks/useLocalization';

type ProgressBarProps = {
  password?: string;
};

const ProgressBar = (props: ProgressBarProps) => {
  const { password } = props;
  const strength = usePasswordStrength(password);
  const { LocalizationData } = useLocalization();
  const { authForm } = LocalizationData;

  return (
    <div className={classes.wrapper}>
      <label htmlFor="progress">{authForm.passwordStrength}</label>
      <progress className={classes.progress} id="progress" max="5" defaultValue="0" value={strength} />
    </div>
  );
};

export default ProgressBar;
