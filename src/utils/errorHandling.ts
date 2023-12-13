import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

export const errorHandling = (error: unknown) => {
  if (error instanceof FirebaseError || error instanceof Error) {
    const { message } = error;
    toast(message, { type: 'error' });
  }
};
