import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" /> : <>{children}</>;
};

export default AuthLayout;
