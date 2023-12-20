import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import Spinner from '@/components/Spinner/spinner.tsx';
import { ButtonPriority, ButtonType } from '@/constants/constants.ts';
import classes from './button.module.css';

type ButtonProps = {
  text?: string;
  title?: string;
  className?: string;
  type?: `${ButtonType}`;
  priority?: `${ButtonPriority}`;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  linkHref?: string;
  children?: ReactNode;
};

const Button = (props: ButtonProps) => {
  const {
    text,
    title,
    className,
    priority = ButtonPriority.PRIMARY,
    disabled,
    loading,
    type = ButtonType.BUTTON,
    linkHref,
    onClick,
    children,
  } = props;

  const button = (
    <button
      title={title}
      type={type}
      disabled={disabled}
      className={clsx(
        classes.button,
        priority === ButtonPriority.PRIMARY ? classes.buttonPrimary : classes.buttonSecondary,
        className
      )}
      onClick={onClick}
    >
      {children}
      <div className={classes.text}>{loading ? <Spinner size={15} /> : text}</div>
    </button>
  );

  if (linkHref) {
    return <Link to={linkHref}>{button}</Link>;
  }

  return button;
};

export default Button;
