import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase/firebase.ts';

const GuestLayout = ({ children }: { children: ReactNode }) => {
  const [user] = useAuthState(auth);

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default GuestLayout;
