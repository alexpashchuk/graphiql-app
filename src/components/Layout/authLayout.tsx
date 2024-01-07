import { ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { auth } from '@/firebase/firebase.ts';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [user] = useAuthState(auth);

  return user ? <Navigate to="/editor" /> : <>{children}</>;
};

export default AuthLayout;
