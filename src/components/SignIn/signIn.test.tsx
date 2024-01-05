import { vi } from 'vitest';
import * as firestoreAuth from 'firebase/auth';
import SignIn from '@/components/SignIn/signIn.tsx';
import { renderWithProviders } from '@/test/test-utils.tsx';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { logInWithEmailAndPassword } from '@/firebase/firebase.ts';
import { auth } from '@/firebase/firebase.ts';
import { SIGN_UP } from '@/constants/constants.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  const auth = actual as typeof firestoreAuth;
  return {
    ...auth,
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  };
});

const mockOnSubmit = vi.fn();
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      register: vi.fn(),
      handleSubmit: mockOnSubmit,
      formState: {
        errors: {},
      },
    }),
  };
});

const mockDispatch = vi.fn();
vi.mock('@/hooks/useRedux', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/hooks/useRedux')),
  useAppDispatch: () => mockDispatch,
}));

describe('Sign in test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('sign in with email and password ', async () => {
    const wrapper = renderWithProviders(<SignIn />);
    const testEmail = 'test@gmail.com';
    const testPassword = 'VKNbS9c%3bBcHLXSn';

    const inputEmail = wrapper.getByTestId('email') as HTMLInputElement;
    const inputPassword = wrapper.getByTestId('password') as HTMLInputElement;
    const submitButton = wrapper.getByText(/Submit/i);

    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: testEmail } });
      fireEvent.change(inputPassword, { target: { value: testPassword } });
    });
    expect(inputEmail.value).toBe(testEmail);
    expect(inputPassword.value).toBe(testPassword);

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();

    await logInWithEmailAndPassword(testEmail, testPassword);
    expect(firestoreAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(auth, testEmail, testPassword);
  });

  it('change auth view', async () => {
    const wrapper = renderWithProviders(<SignIn />);
    const signUpButton = wrapper.getByText(/Sign up/i);

    await act(async () => {
      fireEvent.click(signUpButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setAuthView(SIGN_UP));
  });
  it('handles validation errors', async () => {
    const wrapper = renderWithProviders(<SignIn />);
    const invalidEmail = 'invalid-email';
    const invalidPassword = 'short';

    const inputEmail = wrapper.getByTestId('email') as HTMLInputElement;
    const inputPassword = wrapper.getByTestId('password') as HTMLInputElement;
    const submitButton = wrapper.getByText(/Submit/i);

    await act(async () => {
      fireEvent.change(inputEmail, { target: { value: invalidEmail } });
      fireEvent.change(inputPassword, { target: { value: invalidPassword } });
    });

    await act(async () => {
      fireEvent.submit(submitButton);
    });
  });
});
