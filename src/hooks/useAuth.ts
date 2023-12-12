import { useAppSelector } from '@/hooks/useRedux.ts';
import { selectUser } from '@/store/slices/userSlice.tsx';

export const useAuth = () => {
  const { email, name, view } = useAppSelector(selectUser);

  return {
    isAuth: Boolean(email),
    name,
    view,
  };
};
