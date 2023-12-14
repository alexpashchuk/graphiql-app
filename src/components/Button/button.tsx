import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

import Spinner from '@/components/Spinner/spinner.tsx';

import classes from './button.module.css';

type ButtonProps = {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  priority?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  linkHref?: string;
  children?: ReactNode;
};

const Button = (props: ButtonProps) => {
  const {
    text,
    className,
    priority = 'primary',
    disabled,
    loading,
    type = 'button',
    linkHref,
    onClick,
    children,
  } = props;

  const button = (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        classes.button,
        priority === 'primary' ? classes.buttonPrimary : classes.buttonSecondary,
        className
      )}
      onClick={onClick}
    >
      {children}
      <p className={classes.text}>{loading ? <Spinner size={15} /> : text}</p>
    </button>
  );

  if (linkHref) {
    return <Link to={linkHref}>{button}</Link>;
  }

  return button;
};

export default Button;
