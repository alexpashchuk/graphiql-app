import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth();

  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default GuestLayout;
