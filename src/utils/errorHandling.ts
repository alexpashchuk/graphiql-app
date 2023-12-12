import { FirebaseError } from 'firebase/app';

export const errorHandling = (error: unknown) => {
  if (error instanceof FirebaseError || error instanceof Error) {
    const { message } = error;
    console.log(message);
    // TODO: add toast
    // toast.error(message);
  }
};
